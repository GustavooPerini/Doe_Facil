import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { CreateItemComponent } from './create-item/create-item.component';
import { ViewCreatedItensComponent } from './view-created-itens/view-created-itens.component';
import { ViewReceivedItensComponent } from './view-received-itens/view-received-itens.component';


@NgModule({
  declarations: [CreateItemComponent, ViewCreatedItensComponent, ViewReceivedItensComponent],
  imports: [
    CommonModule,
    ItemRoutingModule
  ]
})
export class ItemModule { }
