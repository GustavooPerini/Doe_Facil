import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from './create-item/create-item.component';
import { ViewCreatedItensComponent } from './view-created-itens/view-created-itens.component';
import { ViewReceivedItensComponent } from './view-received-itens/view-received-itens.component';

const routes: Routes = [
  {
    path:"",
    data: {
      title: "Item"
    },
    children: [
      {
        path: "novo",
        component: CreateItemComponent,
      },
      {
        path: "itens_anunciados",
        component: ViewCreatedItensComponent,
      },
      {
        path: "itens_recebidos",
        component: ViewReceivedItensComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
