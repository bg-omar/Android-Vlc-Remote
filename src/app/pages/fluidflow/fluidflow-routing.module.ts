import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { fluidflow } from './fluidflow';

const routes: Routes = [
  {
    path: '',
    component: fluidflow
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class fluidflowRoutingModule { }
