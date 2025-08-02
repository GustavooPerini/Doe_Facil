import { UserService } from "src/app/services/user.service";
import { Component } from "@angular/core";
import User from "src/app/models/User";
import { navItems, navItemsRoleAdmin, navItemsRoleUser } from "./_nav";

import { DEFAULT_ROLE } from "src/environments/environment";

@Component({
	selector: "app-dashboard",
	templateUrl: "./default-layout.component.html",
	providers: [UserService],
})
export class DefaultLayoutComponent {
	public navItems = navItems;
	public loggedUser!: User;
	

	constructor(private userService: UserService) {
		this.loggedUser = this.userService.getLoggedUser();
		this.changeNavItens();
	}

	ngOnInit() {}

	public changeNavItens(): void {
		if (this.loggedUser.role === "SUPER") {
			this.navItems = navItems;
		} else if (this.loggedUser.role === "ADMIN") {
			this.navItems = navItemsRoleAdmin;
		} else if (this.loggedUser.role === "USER") {
			this.navItems = navItemsRoleUser;
		} 
	}
}
