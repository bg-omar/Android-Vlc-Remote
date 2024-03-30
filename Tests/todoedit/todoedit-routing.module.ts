import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoEdit } from './todoedit.component';

const routes: Routes = [
  {
    path: '',
    component: TodoEdit
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoEditRoutingModule { }
