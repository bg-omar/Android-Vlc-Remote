import {Component, ElementRef, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'iframe-toggler',
  template: `
    <iframe-toggler-child [hideIFrame]="hideIFrame"></iframe-toggler-child>
  `
})
export class IFrameTogglerParent {
  @Output() iframeToggle = new EventEmitter<HTMLIFrameElement>();
  hideIFrame: ElementRef;

  onIframeToggle(iframe: HTMLIFrameElement) {
    this.iframeToggle.emit(iframe);
  }
}
