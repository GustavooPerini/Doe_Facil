import { StorageService } from "./storage.service";
import { Injectable } from "@angular/core";
import { URL_API } from "./../utils/url-api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import User from "./../models/User";
import { DEFAULT_ROLE } from "../../environments/environment";
import AuthDTO from "../models/AuthDTO";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(
		private http: HttpClient,
		private storageService: StorageService
	) { }

	private static currentUser ?: User = undefined;
	
	public setLoggedUser() {
		// Se não houver ninguém logado, vamos usar o usuário de desenvolvimento
		// Em produção, o sistema nunca poderá acessar o modo desenvolvimento.
		let devUser = this.setDevModetUser();

		return new Observable((observer) => {
			this.getAuthLoggedUser().subscribe({
				next: (resp) => {
					console.log("Usuário logado (set): ", resp);
					try {
						if (resp.fullName) {
							UserService.currentUser = devUser;
							observer.next(DEFAULT_ROLE);
							observer.complete();
						} else {
							// É neste bloco que a requisição funcionou corretamente
							UserService.currentUser = new User(resp.principal);
							localStorage.setItem('userRole', btoa(resp.principal.role));
							observer.next(resp.principal.fullName);
							observer.complete();
						}
					} catch (error) {
						UserService.currentUser = devUser;
						localStorage.setItem('userRole', btoa(devUser.role));
						observer.next(DEFAULT_ROLE);
						observer.complete();
					}
				},
				error: (error) => {
					console.log("Não foi possível encontrar o usuário logado");
					UserService.currentUser = devUser
					observer.next(DEFAULT_ROLE);
					observer.complete();
				},
			});
		});
	}

	public getLoggedUser() {
		if (UserService.currentUser == undefined) {
			return this.setDevModetUser();
		} else {
			return new User(UserService.currentUser);
		}
	}

	public removeLoggedUser() {
		UserService.currentUser = undefined;
	}

	private setDevModetUser(): User {
		return new User();
	}

	public userLoginRegister(user: AuthDTO): Observable<any> {
		return this.http.post(`${URL_API}/auth/register`, user);
	}

	public getAuthLoggedUser(): Observable<any> {
		return this.http.get(`${URL_API}/api/user/logged-user`);
	}

	public update(user: User, url: string): Observable<any> {
		return this.http.patch(url, user);
	}

	public findByUserName(userName: string): Observable<any> {
		return this.http.get(
			`${URL_API}/api/user/search/findByUserName?userName=${userName}`
		);
	}

	public comparePasswords(
		userName: string,
		password: string
	): Observable<any> {
		const data = {
			userName: userName,
			password: password,
		};
		return this.http.post(`${URL_API}/api/user/compare-passwords`, data);
	}

	public userRegisterDashboard(user: User): Observable<any> {
		return this.http.post(`${URL_API}/api/user`, user);
	}

	public logout(): Observable<any> {
		return this.http.get(`${URL_API}/logout`);
	}

	public getAllPagedAndSorted(page: number, itensPerPage: number): Observable<any> {
		return this.http.get(
			`${URL_API}/api/user?page=${page}&size=${itensPerPage}&sort=fullName`
		);
	}

	public changeUserAccess(allowed: boolean, url: string): Observable<any> {
		const data = {
			allowed: allowed,
		};
		return this.http.patch(url, data);
	}

	public changeAllowedAccessToAll(role: string, access: boolean): Observable<any> {
		return this.http.get(`${URL_API}/api/user/changeAllowedAccessToAll?role=${role}&access=${access}`);
	}

	public changeUserRole(role: string, url: string): Observable<any> {
		const data = {
			role: role,
		};
		return this.http.patch(url, data);
	}

	public delete(url: string): Observable<any> {
		return this.http.delete(url);
	}

	public findByFullNameContaining(fullName: string, page: number, itensPerPage: number): Observable<any> {
		return this.http.get(
			`${URL_API}/api/user/search/findByFullNameContaining?fullName=${fullName}&page=${page}&size=${itensPerPage}&sort=date&sort=fullName`
		);
	}
}
