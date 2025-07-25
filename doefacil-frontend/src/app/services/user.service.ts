import { StorageService } from "./storage.service";
import { Injectable } from "@angular/core";
import { URL_API } from "./../utils/url-api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import User from "./../models/User";
import { DEFAULT_ROLE } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(
		private http: HttpClient,
		private storageService: StorageService
	) { }

	private static currentUser ?: User = undefined;
	/**
	 * @author Andre Pacheco
	 * Esse método busca o usuário logado através do método getAuthLoggedUser. Portanto, ele é uma
	 * busca direta na API.  Ele retorna um Observable que pode ser tratado em qualquer lugar que o chame.
	 * A ideia é que este método seja chamado logo após o usuário realizar o login.
	 * Uma vez chamado, este método utiliza o serviço de Storage para salvar o usuário logado no localStorage
	 * do navegador. A partir deste momento, sempre que for necessário recuperar o usuário logado, deve-se
	 * chamar o método getLoggedUser() que está logo abaixo.
	 */
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

	/**
	 * Esse método recupera as informações de um usuário logado que foi salvo no localStorage do navegador.
	 * Sempre que for necessário recuperar o usuário logado, deve-se chamar esse método.
	 * @author Andre Pacheco
	 * @returns Retorna o usuário logado. Se não houver, retorna um usuário default (modo desenvolvimento)
	 */
	public getLoggedUser() {
		if (UserService.currentUser == undefined) {
			return this.setDevModetUser();
		} else {
			return new User(UserService.currentUser);
		}
	}

	/**
	 * Este método remove o usuário logado do storage. Ele deve ser chamado quando usuário realizar o logout.
	 * @author Andre Pacheco
	 */
	public removeLoggedUser() {
		UserService.currentUser = undefined;
	}

	/**
	 * Este método retorna um usuário default para ser usado em desenvolvimento
	 * @autor Andre Pacheco
	 * @returns Retorna um usuário default para ser usado em desenvolvimento
	 */
	private setDevModetUser(): User {
		return new User();
	}

	/**
	 * Método para cadastrar um usuário no sistema utilizando a api-aberta,
	 * ou seja, nao precisa estar logado para cadastrar
	 * @author André Pacheco
	 * @param user Usuario a ser cadastrado no sistema
	 */
	public userLoginRegister(user: User): Observable<any> {
		return this.http.post(`${URL_API}/api-open/user-register`, user);
	}

	/**
	 * @author Andre Pacheco
	 * Este método busca um usuário logado usando o Spring Security
	 */
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

	/**
	 * Método para buscar usuários cadastrados no sistema, utilizando paginação
	 * @author Gabryel Batista
	 * @param page página a ser buscada
	 * @param itensPerPage Quantidade de usuários por página
	 */

	public getAllPagedAndSorted(page: number, itensPerPage: number): Observable<any> {
		return this.http.get(
			`${URL_API}/api/user?page=${page}&size=${itensPerPage}&sort=fullName`
		);
	}

	/**
	 * Método para atualizar se o usuário pode acessar o sistema
	 * @author Gabryel Batista
	 * @param allowed Booleano que indica se o usuário pode acessar o sistema
	 * @param url String com a url do usuário a ser alterado
	 */
	public changeUserAccess(allowed: boolean, url: string): Observable<any> {
		const data = {
			allowed: allowed,
		};
		return this.http.patch(url, data);
	}

	/**
	 * @author Eduarda Magesk
	 * Method to change the allowed access of all users from a specific role
	 * @param allowed 
	 * @param role 
	 * @returns 
	 */
	public changeAllowedAccessToAll(role: string, access: boolean): Observable<any> {
		return this.http.get(`${URL_API}/api/user/changeAllowedAccessToAll?role=${role}&access=${access}`);
	}

	/**
	 * Método para atualizar a role do usuário
	 * @author Gabryel Batista
	 * @param role String com a role do usuário
	 * @param url String com a url do usuário a ser alterado
	 */
	public changeUserRole(role: string, url: string): Observable<any> {
		const data = {
			role: role,
		};
		return this.http.patch(url, data);
	}

	/**
	 * Método para deletar um usuário do banco de dados
	 * @author Gabryel Batista
	 * @param url String com a url do usuário a ser deletado
	 */
	public delete(url: string): Observable<any> {
		return this.http.delete(url);
	}

	/**
	 * @author Eduarda Magesk
	 * Method to find users by full name
	 * @param fullName 
	 * @param page 
	 * @param itensPerPage 
	 * @returns 
	 */
	public findByFullNameContaining(fullName: string, page: number, itensPerPage: number): Observable<any> {
		return this.http.get(
			`${URL_API}/api/user/search/findByFullNameContaining?fullName=${fullName}&page=${page}&size=${itensPerPage}&sort=date&sort=fullName`
		);
	}
}
