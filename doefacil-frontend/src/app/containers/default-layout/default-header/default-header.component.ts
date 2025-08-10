import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { HeaderComponent } from "@coreui/angular";
import { AuthService } from "../../../services/auth.service";
import { nextTick } from "process";

@Component({
	selector: "app-default-header",
	templateUrl: "./default-header.component.html",
})
export class DefaultHeaderComponent extends HeaderComponent {
	@Input()
	sidebarId: string = "sidebar";

	constructor(
		private router: Router,
		private authService: AuthService
	) {
		super();
	}
	
	public logout(): void {

		this.authService.logout();
		this.router.navigate(["/login"]);
	}
}
