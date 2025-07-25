import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserViewerComponent } from "./user-viewer/user-viewer.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserNewComponent } from "./user-new/user-new.component";

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Usuário",
		},
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "cards",
			},
			{
				path: "visualizar",
				component: UserViewerComponent,
			},
			{
				path: "editar",
				component: UserEditComponent,
			},
			{
				path: "novo",
				component: UserNewComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
