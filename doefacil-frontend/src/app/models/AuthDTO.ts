export default class AuthDTO {

    public userName?: string;
    public login?: string;
    public password?: string;
    public email?: string;

    constructor(object ?: any) {
		if(object !== undefined){
			this.updateUser(object);
		}
	}

	public updateUser(object : any){
		this.userName = object.userName.toUpperCase();
		this.email = object.email.toLowerCase();
		this.login = object.login.toLowerCase();
		this.password = object.password;
	}
}