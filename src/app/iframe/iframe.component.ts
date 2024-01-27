import {Component, ViewChild, OnInit, AfterViewInit, Input} from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {iframeResizer} from 'iframe-resizer';



@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  standalone: true
})
export class IframeComponent implements OnInit {

  @Input() framename: string = "";
  @Input() url: string = "http://192.168.2.13:8080";
  urlSafe: SafeResourceUrl;


  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    iframeResizer({ log: true }, '#'+this.framename)
  }

}
