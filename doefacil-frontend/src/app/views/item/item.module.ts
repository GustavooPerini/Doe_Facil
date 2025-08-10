import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { CreateItemComponent } from './create-item/create-item.component';
import { ViewCreatedItensComponent } from './view-created-itens/view-created-itens.component';
import { ViewReceivedItensComponent } from './view-received-itens/view-received-itens.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule } from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../../utils/pipes/pipes.module';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';


@NgModule({
  declarations: [CreateItemComponent, ViewCreatedItensComponent, ViewReceivedItensComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    CardModule,
    FormModule,
    GridModule,
    ModalModule,
    ButtonModule,
    FontAwesomeModule,
    PipesModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()]
})
export class ItemModule { }
