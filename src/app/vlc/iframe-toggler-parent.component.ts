import {Component, ElementRef, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'iframe-toggler',
  template: `
    <iframe-toggler-child  [hideMAC]="hideMAC"></iframe-toggler-child>
  `
})
export class IFrameTogglerParent {
  @Output() iframeToggle = new EventEmitter<HTMLIFrameElement>();
  hideMAC: ElementRef;

  onIframeToggle(iframe: HTMLIFrameElement) {
    this.iframeToggle.emit(iframe);
  }
}
