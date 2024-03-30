import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Todos } from './todos';

const routes: Routes = [
  {
    path: '',
    component: Todos
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
