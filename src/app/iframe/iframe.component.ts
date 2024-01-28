import {Component, ViewChild, OnInit, AfterViewInit, Input, Renderer2, ElementRef} from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {iframeResizer} from 'iframe-resizer';
import {PopoverController} from "@ionic/angular";
import {NgClass} from "@angular/common";



@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  imports: [
    NgClass
  ],
  standalone: true
})
export class IframeComponent implements OnInit {
  @ViewChild('hidePC') hidePC: ElementRef;
  @ViewChild('iframePC') iframePC: ElementRef;
  @ViewChild('framename') myDiv: ElementRef;

  @Input() framename: string = "";
  @Input() url: string = "http://192.168.2.13:8080";
  urlSafe: SafeResourceUrl;
  hidden: boolean = false;


  constructor(public sanitizer: DomSanitizer, private renderer: Renderer2, public popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    iframeResizer({ log: true }, '#'+this.framename)
  }

  ngAfterViewInit() {
    this.renderer.listen(this.hidePC.nativeElement, 'click', () => {
      this.toggleIframe();
    });



    this.renderer.listen(this.myDiv.nativeElement, 'animationstart', (e: AnimationEvent) => {
      if (e.animationName === 'fade-in') {
        this.renderer.addClass(this.myDiv.nativeElement, 'did-fade-in');
      }
    });

    this.renderer.listen(this.myDiv.nativeElement, 'animationend', (e: AnimationEvent) => {
      if (e.animationName === 'fade-out') {
        this.renderer.removeClass(this.myDiv.nativeElement, 'did-fade-in');
      }
    });

  }


  toggleIframe() {
    this.iframePC.nativeElement.style.display = this.iframePC.nativeElement.style.display === 'none'? 'inline-block' : 'none';
    this.iframePC.nativeElement.contentWindow.postMessage({ type: 'toggle-iframe' }, '*');
  }
}
