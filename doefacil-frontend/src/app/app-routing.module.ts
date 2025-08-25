import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DefaultLayoutComponent } from "./containers";
import { Page404Component } from "./views/pages/page404/page404.component";
import { Page500Component } from "./views/pages/page500/page500.component";
import { LoginComponent } from "./views/pages/login/login.component";
import { RegisterComponent } from "./views/pages/register/register.component";
import { UserAccessGuard } from "./guards/user-access.guard"; 

const routes: Routes = [
	{
		path: "",
		redirectTo: "login",
		pathMatch: "full",
	},
	{
		path: "dashboard",
		component: DefaultLayoutComponent,
		data: {
			title: "Home",
		},
		children: [
			{
				path: "",
				loadChildren: () =>
					import("./views/dashboard/dashboard.module").then(
						(m) => m.DashboardModule
					),
			},
			{
				path: "usuario",
				loadChildren: () =>
					import("./views/user/user.module").then(
						(m) => m.UserModule
					),
			},
			{
				path: "item",
				loadChildren: () =>
					import("./views/item/item.module").then(
						(m) => m.ItemModule
					),
			},
			{
				path: "pages",
				loadChildren: () =>
					import("./views/pages/pages.module").then(
						(m) => m.PagesModule
					),
			},
		],
	},
	{
		path: "login",
		component: LoginComponent,
		data: {
			title: "Login Page",
		},
	},
	{
		path: "register",
		component: RegisterComponent,
		data: {
			title: "Register Page",
		},
	},
	{
		path: "404",
		component: Page404Component,
		data: {
			title: "Page 404",
		},
	},
	{
		path: "500",
		component: Page500Component,
		data: {
			title: "Page 500",
		},
	},
	{
		path: "**",
		redirectTo: "dashboard",
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: "top",
			anchorScrolling: "enabled",
			initialNavigation: "enabledBlocking",
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
