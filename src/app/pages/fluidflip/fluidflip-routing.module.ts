import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Fluidflip } from './fluidflip';

const routes: Routes = [
  {
    path: '',
    component: Fluidflip
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class fluidflipRoutingModule { }
