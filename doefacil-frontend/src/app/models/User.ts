import { DEFAULT_ROLE } from "../../environments/environment";

export default class User {

	public fullName: string = 'DEV_MODE';
	public userName: string = '';
	public passwd: string = '';
	public email: string = '';
	public allowed: boolean = false;
	public role: string= DEFAULT_ROLE;
	public href: string = '';

	constructor(object ?: any) {
		if(object !== undefined){
			this.updateUser(object);
		}
	}

	public updateUser(object : any){
		this.fullName = object.fullName.toUpperCase();
		this.email = object.email.toLowerCase();
		this.userName = object.userName.toLowerCase();
		this.passwd = object.passwd;
		this.allowed = object.allowed;
		this.role = object.role;

		if (object._links !== undefined) {
			this.href = object._links.self.href;
		}
		else {
			this.href = object.href;
		}
	}

	public print(): void {
		console.log("NomeCompleto: " + this.fullName);
		console.log("nomeUsuario: " + this.userName);
		console.log("senha: " + this.passwd);
		console.log("email: " + this.email);
		console.log("allowed: " + this.allowed);
		console.log("role: " + this.role);
	}
}
