import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import "jquery";
import {VlcPopoverPage} from "./vlc-popover";
import {PopoverController} from "@ionic/angular";
import {Element} from "@angular/compiler";
import {StorageService} from "../services/storage.service";
import {GetResult} from "@capacitor/preferences";


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

  user: user = {
    name: 'me',
    age: 36,
    country: 'NL'
  };
  that = JSON.stringify(this.user)

  public getterdata = "testing no data";

  constructor(public storageServive: StorageService, private renderer: Renderer2, public popoverCtrl: PopoverController) { }

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

  setJson() {
    this.storageServive.setData(this.user.name, this.that );
  }
  async getJson() {
    await this.storageServive.getData(this.user.name).then((data:any) => { this.getterdata = data.value});
  }
  async delJson() {
    await this.storageServive.delData(this.user.name);
    this.getterdata = "testing deleted data";
  }
}

