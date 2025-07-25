import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
// @author Gabriel Schettino
// Importado do CoreUI, apenas traduzido
export class ValidationFormsService {
	errorMessages: any;

    formRules = {
        nonEmpty: "^[a-zA-Z0-9_-]+([_-][a-zA-Z0-9]+)*$",
        loginMin: 5,
        passwordMin: 6,
        passwordPattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
    };

    formErrors = {
        userName: "",
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
        accept: false,
    };

    constructor() {
        this.errorMessages = {
            userName: {
                required: "O nome completo é obrigatório",
            },
            login: {
                required: "O login é obrigatório",
                minLength: `O login deve ter ${this.formRules.loginMin} caracteres ou mais`,
                pattern:
                    "Deve conter letras e/ou números, sem espaços a direita ou caracteres especiais",
            },
            email: {
                required: "O e-mail é obrigatório",
                email: "Endereço de email inválido",
            },
            password: {
                required: "A senha é obrigatória",
                pattern:
                    "A senha deve conter: números, letras maiúsculas e minúsculas",
                minLength: `A senha deve ter ${this.formRules.passwordMin} caracteres ou mais`,
            },
            confirmPassword: {
                required: "A confirmação de senha é requerida",
                passwordMismatch: "As senhas devem ser iguais",
            },
        };
    }
}
