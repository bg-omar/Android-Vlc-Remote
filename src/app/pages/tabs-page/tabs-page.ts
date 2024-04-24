import { Component } from '@angular/core';
import {VlcComponent} from "../vlc/vlc.component";
import {IonicModule} from "@ionic/angular";
import {IFrameToggler} from "../../iframe/iframe-toggler.component";

@Component({
  standalone: true,
  imports: [
    IonicModule,
    IFrameToggler
  ],
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  toggle($event: string) {
    console.log("%c ---> tabspage $event: ","color:#F0F;", $event);
    VlcComponent.hideIframe = $event;
  }
}
