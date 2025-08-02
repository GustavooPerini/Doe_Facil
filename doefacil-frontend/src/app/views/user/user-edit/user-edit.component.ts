import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import User from "../../../models/User";

@Component({
	selector: "app-user-edit",
	templateUrl: "./user-edit.component.html",
	styleUrls: [],
	providers: [UserService],
})
export class UserEditComponent implements OnInit {
	public user: any;
	public editErrorVisible: boolean = false;
	public editSuccessVisible: boolean = false;

	/**************************ICONS USED ******************************/

	public icons = {
		faUser,
	};

	public iconsFa = {
		faCircleCheck,
	};

	/**************************ICONS USED ******************************/

	editForm!: FormGroup;
	formErrors: any;
	formControls!: string[];
	submitted = false;
	public responseRegisterFlag?: string;
	incorrectPasswordFlag = true;

	constructor(
		public validationFormsService: ValidationFormsService,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private userService: UserService
	) {
		this.formErrors = this.validationFormsService.errorMessages;
		this.createForm();
	}

	createForm() {
		this.editForm = this.formBuilder.group({
			fullName: ["", [Validators.required]],
			userName: [
				"",
				[
					Validators.required,
					Validators.pattern(
						this.validationFormsService.formRules.nonEmpty
					),
				],
			],
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
			newPassword: [
				"",
				[
					Validators.minLength(
						this.validationFormsService.formRules.passwordMin
					),
					Validators.pattern(
						this.validationFormsService.formRules.passwordPattern
					),
				],
			],
			allowed: [true],
		});
		this.formControls = Object.keys(this.editForm.controls);
	}

	ngOnInit() {
		let loggedUser = this.userService.getLoggedUser();
		this.editForm.patchValue({
			email: loggedUser.email,
			userName: loggedUser.userName,
			fullName: loggedUser.login,
		});

		this.userService.findByUserName(loggedUser.userName).subscribe({
			next: (resp2) => {
				this.user = resp2;
			},
			error: (error) => {
				console.log(
					"Nome de usuario nao encontrado. Provavelmente, voce esta no modo de desenvolvimento."
				);
				this.user = loggedUser;
			},
		});

		this.editForm.controls["fullName"].markAsTouched();
		this.editForm.controls["userName"].markAsTouched();
		this.editForm.controls["email"].markAsTouched();
	}

	public checkUserPassword(password: string): void {
		this.userService
			.comparePasswords(this.user.userName, this.editForm.value.password)
			.subscribe({
				next: (resp) => {
					if (resp.state === "correct-password") {
						this.incorrectPasswordFlag = false;
					} else {
						this.incorrectPasswordFlag = true;
					}
				},
			});
	}

	public receiveFormData() {
		const url = this.user._links.self.href;
		let attUser : User;

		if (this.editForm.value.newPassword === "") {
			//NO CASO, O USUÁRIO NÃO PREENCHEU O CAMPO DE NOVA SENHA E NÃO QUER TROCAR A SENHA
			attUser = new User(this.editForm.value);
		} else {
			//CASO CONTRÁRIO, O USUÁRIO PREENCHEU O CAMPO DE NOVA SENHA E QUER TROCAR A SENHA
			attUser = new User(this.editForm.value);
			attUser.passwd = this.editForm.value.newPassword;
		}
		
		this.formControls = Object.keys(this.editForm.controls);
		this.userService.update(attUser, url).subscribe({
			next: (resp) => {
				this.responseRegisterFlag = "success";
				this.toggleEditSuccess();
			},
			error: (error) => {
				this.responseRegisterFlag = "error";
				this.toggleEditError();
			},
		});
	}

	public handleEditError(event: any) {
		this.editErrorVisible = event;
	}

	public toggleEditError() {
		this.editErrorVisible = !this.editErrorVisible;
	}

	public handleEditSuccess(event: any) {
		this.editSuccessVisible = event;
	}

	public toggleEditSuccess() {
		this.editSuccessVisible = !this.editSuccessVisible;
	}
}
