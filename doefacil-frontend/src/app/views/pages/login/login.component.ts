import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import { ValidationFormsService } from "../../../services/validation-forms.service";
import { UserService } from "../../../services/user.service";
import { LoginService } from "./../../../services/login.service";

import { cilBook } from "@coreui/icons";
import { AuthService } from "../../../services/auth.service";
import { AuthRequest } from "../../../models/AuthRequest";


@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	providers: [ValidationFormsService, LoginService, UserService],
})
export class LoginComponent implements OnInit {
	/**************************ICONS USED ******************************/
	public icons = { cilBook, faUser, faLock };
	/**************************ICONS USED ******************************/

	public submitted = false;
	public formErrors: any;
	public retrievePasswordForm!: FormGroup;
	public loginForm: FormGroup;
	public formControls!: string[];

	//Variáveis de visualização dos modais de erros e de sucesso
	public LoginErrorVisible = false;
	public RetrievePasswordVisible = false;
	public SuccessRetrieveVisible = false;
	public ErrorRetrieveVisible = false;
	public spinnerVisible = false;
	public loginErrorMessage = "";

	constructor(
		private LoginService: LoginService,
		private authForm: FormBuilder,
		private router: Router,
		private formBuilder: FormBuilder,
		public validationFormsService: ValidationFormsService,
		private userService: UserService,
		private authService: AuthService
	) {
		this.formErrors = this.validationFormsService.errorMessages;

		this.loginForm = this.authForm.group({
			email: ["",[Validators.required, Validators.email]],
			password: ["", [Validators.required]],
		});

		this.retrievePasswordForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
		});
		this.formControls = Object.keys(this.retrievePasswordForm.controls);
	}

	ngOnInit() {}

	//Chamada para o serviço de login
	public getAuthForm() {
		this.toggleSpinnerVisible();
		
		let user: AuthRequest = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		};

		this.authService.login(user).subscribe({
			next: () => {
				this.toggleSpinnerVisible();
				this.router.navigate(["/dashboard"]);
			},
			error: (err) => {
				this.toggleSpinnerVisible();
				this.loginErrorMessage =
					"E-mail e/ou senha incorreto(s). Por favor, tente novamente.";
				this.toggleLoginError();
			}
		});

		// this.LoginService.loginAuth(this.loginForm.value).subscribe({
		// 	next: (response) => {
		// 		console.log(response.token);
		// 		this.tokenService.setToken(response.token);
		// 		this.toggleSpinnerVisible();
		// 		this.router.navigate(["/dashboard"]);
		// 	},
		// 	error: (err) => {
		// 		this.toggleSpinnerVisible();
		// 		this.loginErrorMessage =
		// 			"Login e/ou senha incorreto(s). Por favor, tente novamente.";
		// 		this.toggleLoginError();
		// 	},
		// });
	}

	//Chamada para o serviço de recuperação de senha
	public retrievePassword() {
		this.toggleSpinnerVisible();
		this.LoginService.retrievePassword(
			this.retrievePasswordForm.get("email")?.value
		).subscribe({
			next: (response) => {
				this.toggleSpinnerVisible();
				if (response.status == "sent") {
					this.toggleRetrievePassword();
					this.toggleSuccessRetrieve();
				} else if (response.status == "user-not-registered") {
					this.toggleRetrievePassword();
					this.toggleErrorRetrieve();
				}
			},
			error: (err) => {
				this.toggleSpinnerVisible();
				if (err.error.text == "sent")
				{
					this.toggleRetrievePassword();
					this.toggleSuccessRetrieve();
				}
				else{
					this.toggleRetrievePassword();
					this.loginErrorMessage =
						"Ocorreu um erro ao recuperar o e-mail.";
					this.toggleLoginError();
				}
			},
		});
	}

	public toggleRetrievePassword() {
		this.RetrievePasswordVisible = !this.RetrievePasswordVisible;
	}

	public handleRetrievePassword(event: any) {
		this.RetrievePasswordVisible = event;
	}

	public toggleSuccessRetrieve() {
		this.SuccessRetrieveVisible = !this.SuccessRetrieveVisible;
	}

	public handleSuccessRetrieve(event: any) {
		this.SuccessRetrieveVisible = event;
	}

	public toggleErrorRetrieve() {
		this.ErrorRetrieveVisible = !this.ErrorRetrieveVisible;
	}

	public handleErrorRetrieve(event: any) {
		this.ErrorRetrieveVisible = event;
	}

	public toggleLoginError() {
		this.LoginErrorVisible = !this.LoginErrorVisible;
	}

	public handleLoginError(event: any) {
		this.LoginErrorVisible = event;
	}

	public toggleSpinnerVisible() {
		this.spinnerVisible = !this.spinnerVisible;
	}

	public handleSpinnerVisible(event: any) {
		this.spinnerVisible = event;
	}
}
