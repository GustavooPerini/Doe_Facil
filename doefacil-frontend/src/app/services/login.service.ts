import { URL_API } from "./../utils/url-api";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	constructor(private http: HttpClient) {}

	public loginAuth(user: object): Observable<any> {
		return this.http.post(`http://localhost:8080/auth/login`, user);
	}

	public logout(): Observable<any> {
		return this.http.get(`${URL_API}/logout`);
	}

	public retrievePassword(email: string): Observable<any> {
		const body = {
			email: email,
		};
		return this.http.post(`${URL_API}/auth/password-recovery`, body);
	}
}
