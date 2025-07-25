import { WomanComponent } from './woman/woman.component';
import { ChildComponent } from './child/child.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Cadastro",
    },
    children: [
      {
          path: "mulher",
          component: WomanComponent
      },
      {
        path: "criança",
        component: ChildComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
