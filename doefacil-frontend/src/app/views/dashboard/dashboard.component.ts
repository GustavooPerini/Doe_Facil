import { DEFAULT_ROLE } from "src/environments/environment";
import User from "src/app/models/User";
import { UserService } from "src/app/services/user.service";
import { Component } from "@angular/core";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	providers: [UserService],
})
export class DashboardComponent {
	public flagError: boolean;
	public loggedUser!: User;

	constructor(
		private userService: UserService,
	) {
		this.flagError = false;
		this.loggedUser = this.userService.getLoggedUser();
	}

	ngOnInit() {}

	public setFlagError(valor: boolean) {
		this.flagError = valor;
	}
}
