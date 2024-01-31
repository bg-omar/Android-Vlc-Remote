import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Todo } from './todo';

const routes: Routes = [
  {
    path: '',
    component: Todo
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoPageRoutingModule { }
