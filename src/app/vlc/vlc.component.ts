import { Component } from '@angular/core';
import "jquery";
import {VlcPopoverPage} from "./vlc-popover";
import {PopoverController} from "@ionic/angular";

declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;


@Component({
  selector: 'app-vlc',
  templateUrl: './vlc.component.html',
  styleUrls: ['./vlc.component.scss']
})
export class VlcComponent {


  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };

  constructor(public popoverCtrl: PopoverController) { }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: VlcPopoverPage,
      event
    });
    await popover.present();
  }

}
