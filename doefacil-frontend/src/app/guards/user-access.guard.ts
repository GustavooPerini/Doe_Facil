import { UserService } from "../services/user.service";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class UserAccessGuard  {
	constructor(private router: Router, private userService: UserService) { }
	/**
	 * Este método controla as rotas de acesso de acordo com a ROLE do usuário.
	 * Aqui sim é definido a segurança do sistema. A ideia é que ele seja evoluido na medida que
	 * o sistema for crescendo e as ROLES forem bem definidas.
	 *
	 * A ideia do método é bem simples: retorna true se o usuário tiver acesso a rota, e false se não tiver.
	 */
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		// let loggedUser = this.userService.getLoggedUser();
		const storedRole = localStorage.getItem('userRole');
		const role = storedRole ? atob(storedRole) : null;

		console.log("UserAccessGuard", role);

		// console.log("UserAccessGuard", loggedUser);
		// Se o usuário for um SUPER, tudo deve ser liberado
		if (role === "SUPER") {
			return true;
		} else if (role === "ADMIN") {
			if (
				state.url.includes("usuario/")
			) {
				return true;
			} else {
				this.router.navigate(["/dashboard"]);
				return false;
			}
		} else if (role === "USER") {
			if (
				state.url.includes("usuario/editar")
			) {
				return true;
			} else {
				this.router.navigate(["/dashboard"]);
				return false;
			}
		} else {
			this.router.navigate(["/"]);
			return false;
		}
	}
}
