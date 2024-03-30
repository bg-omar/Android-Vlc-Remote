import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Fluidflip } from './fluidflip';
import { fluidflipRoutingModule } from './fluidflip-routing.module';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    component: Fluidflip
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    CommonModule,
    IonicModule,
    fluidflipRoutingModule,
    Fluidflip
  ],
  declarations: [  ],
  exports: [RouterModule]
})
export class FluidflipModule { }
