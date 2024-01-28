import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'iframe-toggler-child',
  template: `
    <button #hideIFrame [innerHTML]="hideIFrame.innerHTML" (click)="toggleIframe()">htrrr</button>
    <iframe #iframe></iframe>
  `
})
export class IFrameTogglerChild {
  @Input() hideIFrame: ElementRef;
  @ViewChild('iframe') iframe: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.listen(this.hideIFrame.nativeElement, 'click', () => {
      this.toggleIframe();
    });
  }

  toggleIframe() {
    this.iframe.nativeElement.style.display = this.iframe.nativeElement.style.display === 'none'? 'block' : 'none';
    this.iframe.nativeElement.contentWindow.postMessage({ type: 'toggle-iframe' }, '*');
  }
}
