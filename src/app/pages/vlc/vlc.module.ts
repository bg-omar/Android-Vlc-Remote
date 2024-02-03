import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { VlcComponent } from './vlc.component';
import { VlcRoutingModule } from './vlc-routing.module';
import { VlcPopoverPage } from './vlc-popover';
import {HexatrailComponent} from "../../hexatrail/hexatrail.component";
import {AccountModule} from "../account/account.module";
import {IFrameTogglerParent} from "./iframe-toggler-parent.component";
import {IFrameTogglerChild} from "./iframe-toggler-child.component";



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VlcRoutingModule,
    FormsModule,
    IonicModule,
    IonicModule,
    HexatrailComponent,
    AccountModule,
  ],
  declarations: [
    VlcComponent, VlcPopoverPage, IFrameTogglerParent, IFrameTogglerChild
  ],
  bootstrap: [VlcComponent]
})
export class VlcModule { }
