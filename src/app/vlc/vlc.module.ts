import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { VlcComponent } from './vlc.component';
import { VlcRoutingModule } from './vlc-routing.module';
import { VlcPopoverPage } from './vlc-popover';
import {HexatrailComponent} from "../hexatrail/hexatrail.component";
import {HomePage} from "../home/home";



@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        VlcRoutingModule,
        FormsModule,
        IonicModule,
        IonicModule,
        HexatrailComponent,
        HomePage
    ],
  declarations: [
    VlcComponent, VlcPopoverPage
  ],
  bootstrap: [VlcComponent]
})
export class VlcModule { }
