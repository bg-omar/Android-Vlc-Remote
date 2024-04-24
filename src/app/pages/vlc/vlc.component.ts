import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  Config,
  IonRouterOutlet,
  LoadingController,
  PopoverController
} from "@ionic/angular";

import {Router} from "@angular/router";




@Component({
  selector: 'app-vlc',
  templateUrl: './vlc.component.html',
  styleUrls: ['./vlc.component.scss']
})
export class VlcComponent {
  @ViewChild('hidePC') hidePC: ElementRef;
  @ViewChild('hidePC2') hidePC2: ElementRef;
  @ViewChild('hideMAC') hideMAC: ElementRef;
  @ViewChild('iframePC') iframePC: ElementRef;
  @ViewChild('iframePC2') iframePC2: ElementRef;
  @ViewChild('iframeMAC') iframeMAC: ElementRef;
  @ViewChild('myDiv') myDiv: ElementRef;

  hideIframePC: boolean;
  hideIframePC2: boolean;
  hideIframeMAC: boolean;
  static hideIframe: string;


  constructor(
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public config: Config
  ) { }

  toggle($event: string) {
    console.log("$event: ", $event);
    if ($event == 'iframePC') {
      this.hideIframePC = !this.hideIframePC;
    } else if ($event == 'iframePC2') {
      this.hideIframePC2 = !this.hideIframePC2;
    } else if ($event == 'iframeMAC') {
      this.hideIframeMAC = !this.hideIframeMAC;
    }

  }
}

