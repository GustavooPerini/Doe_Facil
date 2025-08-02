import { RouterModule } from "@angular/router";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { DefaultRoutingModule } from "./default-routing.module";

// CoreUI Modules
import {
	AvatarModule,
	BadgeModule,
	BreadcrumbModule,
	ButtonGroupModule,
	ButtonModule,
	CardModule,
	DropdownModule,
	FooterModule,
	FormModule,
	GridModule,
	HeaderModule,
	ListGroupModule,
	NavModule,
	ProgressModule,
	SharedModule,
	SidebarModule,
	TabsModule,
	UtilitiesModule,
	ModalModule,
	TableModule,
	TooltipModule,
	ToastModule,
	AlertModule
} from "@coreui/angular";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IconModule } from "@coreui/icons-angular";
import { ImageCropperModule } from "ngx-image-cropper";
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@NgModule({
	declarations: [
        LoadingModalComponent,
        ErrorModalComponent,
	],
	imports: [
		CommonModule,
		DefaultRoutingModule,
		ReactiveFormsModule,
		AvatarModule,
		BadgeModule,
		BreadcrumbModule,
		ButtonGroupModule,
		ButtonModule,
		CardModule,
		DropdownModule,
		FooterModule,
		FormModule,
		GridModule,
		HeaderModule,
		ListGroupModule,
		NavModule,
		ProgressModule,
		SharedModule,
		SidebarModule,
		TabsModule,
		UtilitiesModule,
		ModalModule,
		FontAwesomeModule,
		NgxMaskDirective,
		RouterModule,
		NgbModule,
		IconModule,
		TableModule,
		TooltipModule,
		ImageCropperModule,
		ProgressModule,
		ToastModule,
		AlertModule
	],
	exports: [
        LoadingModalComponent,
        ErrorModalComponent,
	],
	providers: [provideNgxMask()],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DefaultModule { }
