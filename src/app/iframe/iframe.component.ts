import {Component, ViewChild, OnInit, AfterViewInit} from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {iframeResizer} from 'iframe-resizer';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  standalone: true
})
export class IframeComponent implements OnInit, AfterViewInit {

  name = "Set iframe source";
  url: string = "https://192.168.2.13:8080";
  urlSafe: SafeResourceUrl;
  @ViewChild("speedCheck") speedCheck: { nativeElement: { onload: () => void; contentWindow: { postMessage: (arg0: string, arg1: string) => void; }; }; };

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    iframeResizer({ log: true }, '#speedCheck')
  }
  ngAfterViewInit() {
    console.log(this.speedCheck);
    this.speedCheck.nativeElement.onload = () => {
      const data = {
        isNativeApp: "true",
        phoneNumber: "9039839374",
        whiteLabelKey: "pocket_geek"
      };
      this.speedCheck.nativeElement.contentWindow.postMessage(
        JSON.stringify(data),
        "https://192.168.2.13:8080"
      );
    };
  }

}
