import {Component, ElementRef, Input, OnChanges, Renderer2, ViewChild} from '@angular/core';
import {VlcPopoverPage} from "./vlc-popover";
import {
  AlertController, Config, IonFab,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  PopoverController,
  ToastController
} from "@ionic/angular";

import {ConferenceData} from "../../providers/conference-data";
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
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config
  ) { }


  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: VlcPopoverPage,
      event
    });
    await popover.present();
  }


  async openSocial(network: string, fab: IonFab) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    await fab.close();
  }

  toogle($event: string) {
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

