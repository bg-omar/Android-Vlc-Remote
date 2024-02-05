import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  Input,
  Renderer2,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
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
  @ViewChild('myFrame') myFrame: ElementRef;

  @Input() frameName: string = "";
  @Input() url: string = "http://127.0.0.1:8080";
  @Input() hideFrame: boolean = false;
  urlSafe: SafeResourceUrl;




  constructor(public sanitizer: DomSanitizer, private renderer: Renderer2) { }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log("inside child component ngOnInit");

  }
  ngAfterViewInit() {


    this.renderer.listen(this.myFrame.nativeElement, 'animationstart', (e: AnimationEvent) => {
      if (e.animationName === 'fade-in') {
        this.renderer.addClass(this.myFrame.nativeElement, 'did-fade-in');
      }
    });

    this.renderer.listen(this.myFrame.nativeElement, 'animationend', (e: AnimationEvent) => {
      if (e.animationName === 'fade-out') {
        this.renderer.removeClass(this.myFrame.nativeElement, 'did-fade-in');
      }
    });

  }


  toggleIframe() {
    this.myFrame.nativeElement.style.display = this.myFrame.nativeElement.style.display === 'none'? 'inline-block' : 'none';
  }
}
