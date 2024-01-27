
import "jquery";
import { PopoverController } from '@ionic/angular';
import {Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild} from '@angular/core';


@Component({
  templateUrl: './vlc-popover.html',
})
export class VlcPopoverPage {
  @Output() iframeToggle = new EventEmitter<string>();

  onIframeToggle(iframe: string) {
    this.iframeToggle.emit(iframe);
  }
  constructor(public popoverCtrl: PopoverController) {}

  support() {
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    //window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}
