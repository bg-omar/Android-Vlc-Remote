import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import "jquery";
import {VlcPopoverPage} from "./vlc-popover";
import {
  AlertController, Config, IonFab,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  PopoverController,
  ToastController
} from "@ionic/angular";
import {Element} from "@angular/compiler";
import {StorageService} from "../../services/storage.service";
import {GetResult} from "@capacitor/preferences";
import {ConferenceData} from "../../providers/conference-data";
import {Router} from "@angular/router";
import {UserData} from "../../providers/user-data";


declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;

type user = {
  name: string;
  age: number;
  country: string;
};

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

  userSettings: user = {
    name: 'me',
    age: 36,
    country: 'NL'
  };

  userSettings2: user = {
    name: 'you',
    age: 28,
    country: 'NL'
  };
  that: string = JSON.stringify(this.userSettings);
  that2: string = JSON.stringify(this.userSettings2);

  public getterdata = "testing no data";

  constructor(
    public storageServive: StorageService,
    private renderer: Renderer2,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config
  ) { }
  ngAfterViewInit() {
    this.renderer.listen(this.hidePC.nativeElement, 'click', () => {
      this.toggleIframePC();
    });

    this.renderer.listen(this.hidePC2.nativeElement, 'click', () => {
      this.toggleIframePC2();
    });

    this.renderer.listen(this.hideMAC.nativeElement, 'click', () => {
      this.toggleIframeMAC();
    });
  }


  toggleIframePC() {
    this.iframePC.nativeElement.style.display = this.iframePC.nativeElement.style.display === 'none'? 'inline-block' : 'none';
    this.iframePC.nativeElement.contentWindow.postMessage({ type: 'toggle-iframe' }, '*');
  }
  toggleIframePC2() {
    this.iframePC2.nativeElement.style.display = this.iframePC2.nativeElement.style.display === 'none'? 'inline-block' : 'none';
    this.iframePC2.nativeElement.contentWindow.postMessage({ type: 'toggle-iframe' }, '*');
  }
  toggleIframeMAC() {
    this.iframeMAC.nativeElement.style.display = this.iframeMAC.nativeElement.style.display === 'none'? 'inline-block' : 'none';
    this.iframeMAC.nativeElement.contentWindow.postMessage({ type: 'toggle-iframe' }, '*');
  }
  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: VlcPopoverPage,
      event
    });
    await popover.present();
  }

  setJson(setter) {
    if (setter == 1)this.storageServive.setData(this.userSettings.name, this.that).then(r =>{}) ;
    if (setter == 2)this.storageServive.setData(this.userSettings2.name, this.that2).then(r =>{}) ;
  }
  async getJson(getter) {
    if (getter == 1){
      await this.storageServive.getData(this.userSettings.name).then((data:any) => {
        if(data.value) {
          this.getterdata = data.value;
        } else {
          this.getterdata = "no value";
        }
      });
    }
    if (getter == 2){
      await this.storageServive.getData(this.userSettings2.name).then((data:any) => {
        if(data.value) {
          this.getterdata = data.value;
        } else {
          this.getterdata = "no value";
        }
      });
    }
  }
  async delJson() {
    await this.storageServive.delData(this.userSettings.name);
    this.getterdata = "testing deleted data";
  }

  async openSocial(network: string, fab: IonFab) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }
}

