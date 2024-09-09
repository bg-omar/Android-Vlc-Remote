import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'iframe-button',
  standalone: true,
  imports: [
    IonicModule
  ],
  template: `
    <ion-badge [id]="frameName" (click)="onIframeToggle()">
      <em [class]="awesomeLogo"></em>
      <span> {{ buttonText }}</span>
    </ion-badge>
  `,
  styleUrls: ['./iframe.component.scss'],
})
export class IFrameToggler implements OnInit{
  @Input() frameName: string = '';
  @Input() awesomeLogo: string = 'fas fa-cat';
  @Input() buttonText: string = '';
  @Input() hidden: boolean = false;
  @Output() iframeToggle: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    let matchedText;
    if (!this.buttonText) {
      // If buttonText is not defined, use the part of frameName that matches the port or default to frameName

      const pcMatch = this.frameName.match(/\d+\.\d+\.\d+\.(\d+)/);  // Matches the last octet
      const portMatch = this.frameName.match(/:(\d{4})/);  // Matches the first two digits of the port (81)
// Extract values if matches are found
      const pc = pcMatch ? pcMatch[1] : null;
      const port = portMatch ? portMatch[1].slice(-2)  : null;

      if (pc && port) {
        // Combine pc and port into matchedText
        matchedText = pc + ': ' + port;

        // Set buttonText to matchedText if it's valid, otherwise fallback to frameName
        this.buttonText = matchedText;
      } else {
        this.buttonText = this.frameName;  // Fallback if no match is found
      }
    }

    if (this.hidden) {
      // If hidden, set the buttonText to just the digits or default to frameName
      const matchedDigits = this.frameName.match(/(\d+:\d+)/);
      this.buttonText = matchedDigits ? matchedDigits[0] : this.frameName;
      // Optionally remove the logo if hidden
      this.awesomeLogo = '';
    }
  }
  onIframeToggle() {
    this.iframeToggle.emit(this.frameName);
  }
}
