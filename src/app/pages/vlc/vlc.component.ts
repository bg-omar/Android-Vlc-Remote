import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  Config,
  IonRouterOutlet,
  LoadingController,
  PopoverController
} from "@ionic/angular";

import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {AccountPage, User} from "../account/account";




@Component({
  selector: 'app-vlc',
  templateUrl: './vlc.component.html',
  styleUrls: ['./vlc.component.scss']
})
export class VlcComponent implements OnInit {
  @ViewChild('hidePC') hidePC: ElementRef;
  @ViewChild('hidePC2') hidePC2: ElementRef;
  @ViewChild('hideMAC') hideMAC: ElementRef;
  @ViewChild('hideELITE') hideELITE: ElementRef;
  @ViewChild('hideHP') hideHP: ElementRef;
  @ViewChild('iframePC') iframePC: ElementRef;
  @ViewChild('iframePC2') iframePC2: ElementRef;
  @ViewChild('iframeMAC') iframeMAC: ElementRef;
  @ViewChild('iframeELITE') iframeELITE: ElementRef;
  @ViewChild('iframeHP') iframeHP: ElementRef;
  @ViewChild('myDiv') myDiv: ElementRef;

  static hideIframe: string;
  hideIframePC: boolean;
  hideIframePC2: boolean;
  hideIframeMAC: boolean;
  hideIframeELITE: boolean;
  hideIframeHP: boolean;
  vlcdata: User[]=  [];
  all: any;


  constructor(
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public storageServive: StorageService,
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
    } else if ($event == 'iframeELITE') {
      this.hideIframeELITE = !this.hideIframeELITE;
    } else if ($event == 'iframeHP') {
      this.hideIframeHP = !this.hideIframeHP;
    }
  }

  async getJson() {
      await this.storageServive.getData("192.168.2.2:8080").then((data:any) => {
        let res: User[];
          res = JSON.parse(data.value);
          this.vlcdata = res
        console.log("%c 2 --> 73||C:/workspace/projects/Android-vlc-Remote/src/app/pages/vlc/vlc.component.ts\n this.vlcdata: ","color:#0f0;", this.vlcdata);
      });
  }

  ngOnInit(): void {
    this.getJson();
  }

}

