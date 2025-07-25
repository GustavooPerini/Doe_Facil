import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WomanHistoryComponent } from './woman-history/woman-history.component';

const routes: Routes = [

  {
    path: "",
    data: {
      title: "Atendimento"
    },
    children: [
      {
        path: "historico/mulher",
        component: WomanHistoryComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
