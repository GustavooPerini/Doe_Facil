import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { 
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
 } from '@coreui/angular';

import { IconModule } from "@coreui/icons-angular";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { RegisterRoutingModule } from './register-routing.module';
import { WomanComponent } from './woman/woman.component';
import { ChildComponent } from './child/child.component'; 
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [WomanComponent, ChildComponent],
  imports: [
    ButtonModule,
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,

    CardModule,
    FormModule,
    GridModule,
    ModalModule,

    IconModule,
    FontAwesomeModule,

    NgxMaskDirective,
    NgbTypeahead

  ],
  providers: [provideNgxMask()]
})
export class RegisterModule { }
