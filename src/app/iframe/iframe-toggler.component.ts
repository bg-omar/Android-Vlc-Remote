import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'iframe-button',
  standalone: true,
  imports: [
    IonicModule
  ],
  template: `
    <button [id]="frameName" (click)="onIframeToggle()">
      <ion-button>
      <h1><em [class]="awesomeLogo"></em></h1>
      <span> {{ buttonText }}</span></ion-button>
    </button>
  `,
  styleUrls: ['./iframe.component.scss'],
})
export class IFrameToggler implements OnInit{
  @Input()  frameName: string = 'IframePC';
  @Input()  awesomeLogo: string = 'fas fa-cat'
  @Input()  buttonText: string = ''
  @Output() iframeToggle: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    if (this.buttonText == '') this.buttonText = this.frameName;
  }

  onIframeToggle() {
    this.iframeToggle.emit(this.frameName);
    console.log("%c ---> button.frameName: ","color:#F0F;", this.frameName);
  }
}
