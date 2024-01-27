import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'iframe-toggler-child',
  template: `
    <button #hideMAC [innerHTML]="hideMAC.innerHTML" (click)="toggleIframe()">htrrr</button>
    <iframe #iframeMAC></iframe>
  `
})
export class IFrameTogglerChild {
  @Input() hideMAC: ElementRef;
  @ViewChild('iframeMAC') iframeMAC: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.listen(this.hideMAC.nativeElement, 'click', () => {
      this.toggleIframe();
    });
  }

  toggleIframe() {
    this.iframeMAC.nativeElement.style.display = this.iframeMAC.nativeElement.style.display === 'none'? 'block' : 'none';
    this.iframeMAC.nativeElement.contentWindow.postMessage({ type: 'toggle-iframe' }, '*');
  }
}
