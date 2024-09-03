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
  static hideIframe: string;
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

  toggle($event: User) {
    console.log("$event: ", $event);
    this.vlcdata.find(value => {
      if (value.ipAddress === $event.ipAddress) value.hide = !value.hide;
    })
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

