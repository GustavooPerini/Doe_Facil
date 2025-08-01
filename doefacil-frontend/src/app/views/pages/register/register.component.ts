import { Component } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { cilArrowLeft } from "@coreui/icons";

import { UserService } from "./../../../services/user.service";
import { ValidationFormsService } from "../../../services/validation-forms.service";

import User from "./../../../models/User";
import AuthDTO from "../../../models/AuthDTO";

/** passwords must match - custom validator */
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
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
	providers: [ValidationFormsService, UserService],
})
export class RegisterComponent {
	/**************************ICONS USED ******************************/

	public icons = { cilArrowLeft };

	/**************************ICONS USED ******************************/

    public user?: AuthDTO;
    public registerForm!: FormGroup;
    public submitted = false;
    public formErrors: any;
    public formControls!: string[];

    constructor(
        private userService: UserService,
        private router: Router,
        private formBuilder: FormBuilder,
        public validationFormsService: ValidationFormsService
    ) {
        this.formErrors = this.validationFormsService.errorMessages;
        this.createForm();
    }

    public RegisterSuccessVisible = false;
    public RegisterErrorVisible = false;
    public RegisterInProgressVisible = false;
    public DatabaseErrorVisible = false;
    public SendEmailErrorVisible = false;

    public createForm() {
        this.registerForm = this.formBuilder.group(
            {
                userName: ["", [Validators.required]],
                login: [
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
            },
            { validators: [PasswordValidators.confirmPassword] }
        );
        this.formControls = Object.keys(this.registerForm.controls);
    }

    public onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    public onValidate() {
        this.submitted = true;
        return this.registerForm.status === "VALID";
    }

    //função que faz a chamada para o método http se o formulário for válido
    public onSubmit() {
        if (this.onValidate()) {
            this.toggleRegisterInProgressVisible();

			//atribuição dos valores do formulário para o modelo "user"

            // this.user = new User();
            // this.user.userName = this.registerForm.value.userName;
            // this.user.login = this.registerForm.value.login;
            // this.user.passwd = this.registerForm.value.password;
            // this.user.email = this.registerForm.value.email;
            // this.user.allowed = false;
            // this.user.role = "USER";
            //  CHAMADA PARA O SERVIÇO DE CADASTRO DE USUÁRIO

            this.user = new AuthDTO(this.registerForm.value);

            this.userService.userLoginRegister(this.user).subscribe({
                next: (response) => {
                    console.log("resposta:", response);
                    this.toggleRegisterInProgressVisible();
                    this.toggleRegisterSuccess();
                    this.onReset();
                    // if (response.status === "registered") {
                    //     this.toggleRegisterInProgressVisible();
                    //     this.toggleRegisterSuccess();
                    //     this.onReset();
                    // } else if (response.status === "not-allowed") {
                    //     this.toggleRegisterInProgressVisible();
                    //     this.toggleRegisterError();
                    // } else if (response.status === "db-problem") {
                    //     this.toggleRegisterInProgressVisible();
                    //     this.toggleDatabaseError();
                    // } else if (response.status === "lack-of-user-terms") {
                    //     this.toggleRegisterInProgressVisible();
                    //     this.toggleSendEmailError();
                    //     this.onReset();
                    // } else if (response.status === "email-service-error") {
                    //     this.toggleRegisterInProgressVisible();
                    //     this.toggleSendEmailError();
                    //     this.onReset();
                    // }
                },
                error: (err) => {
                    alert(err.error);
                    this.toggleRegisterInProgressVisible();
                }
            });
        }
    }

    public confirmRegister() {
        this.toggleRegisterSuccess();
        this.router.navigate(["/"]);
    }

    public toggleRegisterSuccess() {
        this.RegisterSuccessVisible = !this.RegisterSuccessVisible;
    }

    public handleRegisterSuccess(event: any) {
        this.RegisterSuccessVisible = event;
    }

    public toggleRegisterError() {
        this.RegisterErrorVisible = !this.RegisterErrorVisible;
    }

    public handleRegisterError(event: any) {
        this.RegisterErrorVisible = event;
    }

    public toggleRegisterInProgressVisible() {
        this.RegisterInProgressVisible = !this.RegisterInProgressVisible;
    }

    public handleRegisterInProgressVisible(event: any) {
        this.RegisterInProgressVisible = event;
    }

    public toggleDatabaseError(){
      this.DatabaseErrorVisible = !this.DatabaseErrorVisible;
    }
  
    public handleDatabaseError(event: any) {
      this.DatabaseErrorVisible = event;
    }

    public toggleSendEmailError(){
      this.SendEmailErrorVisible = !this.SendEmailErrorVisible;
    }

    public handleSendEmailError(event: any) {
      this.SendEmailErrorVisible = event;
    }
}
