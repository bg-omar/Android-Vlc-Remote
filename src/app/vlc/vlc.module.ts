import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { VlcComponent } from './vlc.component';
import { VlcRoutingModule } from './vlc-routing.module';
import { VlcPopoverPage } from './vlc-popover';
import {BgBadgeModule} from "../badge/badge.module";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VlcRoutingModule,
    FormsModule,
    BgBadgeModule,
    IonicModule,
    IonicModule
  ],
  declarations: [
    VlcComponent, VlcPopoverPage
  ],
  bootstrap: [VlcComponent]
})
export class VlcModule { }
