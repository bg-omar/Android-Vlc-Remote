import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter
} from "@angular/core";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'iframe-toggle',
  templateUrl: './iframe-button.component.html',
  styleUrls: ['./iframe.component.scss'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class IframeToggleComponent implements OnInit, AfterViewInit {

  @Input() framename: string = "";
  @Input() buttontext: string = "http://192.168.2.13:8080";

  @Input() hideMAC: ElementRef;
  @ViewChild('iframeMAC') iframeMAC: ElementRef;

  @Output() iframeToggle = new EventEmitter<HTMLIFrameElement>();
  currentMsgToChild1: any;



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
  onIframeToggle(iframe: HTMLIFrameElement) {
    this.iframeToggle.emit(iframe);
  }


  ngOnInit(): void {
  }
}

