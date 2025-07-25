import { Component } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	Validators,
} from "@angular/forms";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { Router } from "@angular/router";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import User from "./../../../models/User";
import { UserService } from "./../../../services/user.service";

import { cilUserFollow } from "@coreui/icons";

export class PasswordValidators {
	static confirmPassword(control: AbstractControl): ValidationErrors | null {
		const password = control.get("password");
		const confirm = control.get("confirmPassword");
		if (password?.valid && password?.value === confirm?.value) {
			confirm?.setErrors(null);
			return null;
		}
		confirm?.setErrors({ passwordMismatch: true });
		return { passwordMismatch: true };
	}
}

@Component({
	selector: "app-user-new",
	templateUrl: "./user-new.component.html",
	styleUrls: [],
	providers: [ValidationFormsService, UserService],
})
export class UserNewComponent {
	successVisible = false;
	errorVisible = false;

	/**************************ICONS USED ******************************/
	public icons = { cilUserFollow };
	public iconsFa = { faCirclePlus };
	/**************************ICONS USED ******************************/
	user?: User;

	simpleForm!: FormGroup;
	formErrors: any;
	formControls!: string[];
	submitted = false;
	public responseRegisterFlag?: string;

	constructor(
		private userService: UserService,
		private router: Router,
		private formBuilder: FormBuilder,
		public validationFormsService: ValidationFormsService
	) {
		this.formErrors = this.validationFormsService.errorMessages;
		this.createForm();
	}

    createForm() {
        this.simpleForm = this.formBuilder.group(
            {
                fullName: ["", [Validators.required]],
                userName: [
                    "",
                    [
                        Validators.required,
                        Validators.pattern(
                            this.validationFormsService.formRules.nonEmpty
                        ),
                        Validators.minLength(
                            this.validationFormsService.formRules.loginMin
                        )
                    ],
                ],
                email: ["", [Validators.required, Validators.email]],
                password: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(
                            this.validationFormsService.formRules.passwordMin
                        ),
                        Validators.pattern(
                            this.validationFormsService.formRules
                                .passwordPattern
                        ),
                    ],
                ],
                confirmPassword: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(
                            this.validationFormsService.formRules.passwordMin
                        ),
                        Validators.pattern(
                            this.validationFormsService.formRules
                                .passwordPattern
                        ),
                    ],
                ],
                role: ["", []],
				allowed: [true],
            },
            { validators: [PasswordValidators.confirmPassword] }
        );
        this.formControls = Object.keys(this.simpleForm.controls);
    }

	onReset() {
		this.submitted = false;
		this.simpleForm.reset();
	}

	onValidate() {
		this.submitted = true;
		return this.simpleForm.status === "VALID";
	}

	onSubmit() {
		if (this.onValidate()) {
			//atribuição dos valores do formulário para o modelo "user"
			this.user = new User(this.simpleForm.value);
			this.user.passwd = this.simpleForm.value.password;
			//CHAMADA PARA O SERVIÇO DE CADASTRO DE USUÁRIO

			this.userService.userRegisterDashboard(this.user).subscribe({
				next : (response) => {
					//exibe modal de sucesso
					this.onReset();
					this.toggleSuccessModal();
				},
				error : (error) => {
					//exibe modal de erro
					this.onReset();
					this.toggleErrorModal();
				}
			});
		}
	}

	toggleSuccessModal() {
		this.successVisible = !this.successVisible;
	}

	handleSuccessModalChange(event: any) {
		this.successVisible = event;
	}

	toggleErrorModal() {
		this.errorVisible = !this.errorVisible;
	}

	handleErrorModalChange(event: any) {
		this.errorVisible = event;
	}
}
