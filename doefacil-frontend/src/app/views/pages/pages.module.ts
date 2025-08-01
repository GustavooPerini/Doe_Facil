import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./pages-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { Page404Component } from "./page404/page404.component";
import { Page500Component } from "./page500/page500.component";
import {
	ButtonModule,
	CardModule,
	FormModule,
	GridModule,
} from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "@coreui/angular";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		Page404Component,
		Page500Component,
	],
	imports: [
		CommonModule,
		ModalModule,
		PagesRoutingModule,
		CardModule,
		ButtonModule,
		GridModule,
		IconModule,
		FormsModule,
		ReactiveFormsModule,
		FormModule,
		FontAwesomeModule,
	],
})
export class PagesModule {}
