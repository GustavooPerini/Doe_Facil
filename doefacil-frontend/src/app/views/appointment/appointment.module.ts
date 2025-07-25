import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule, GridModule } from '@coreui/angular';
import { WomanHistoryComponent } from './woman-history/woman-history.component';


@NgModule({
  declarations: [WomanHistoryComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    ReactiveFormsModule,
    FormModule,
    GridModule
  ]
})
export class AppointmentModule { }
