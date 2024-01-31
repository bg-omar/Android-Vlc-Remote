import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import "jquery";
import {VlcPopoverPage} from "./vlc-popover";
import {PopoverController} from "@ionic/angular";
import {Element} from "@angular/compiler";


declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;


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
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };

  constructor(private renderer: Renderer2, public popoverCtrl: PopoverController) { }

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

}
