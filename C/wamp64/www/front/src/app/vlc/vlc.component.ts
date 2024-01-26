import { Component, OnInit, OnChanges, AfterViewInit  } from '@angular/core';
import "jquery";

declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;
/*

const body = document.body || document.getElementsByTagName('body')[0];
document.onkeydown =
  document.onselectstart =
    document.onmousedown =
      document.onclick =
        document.ondragstart =
          document.oncontextmenu =
            body.onselectstart =
              body.onmousedown =
                null;

 */

@Component({
  selector: 'app-vlc',
  templateUrl: './vlc.component.html',
  styleUrls: ['./vlc.component.scss']
})
export class VlcComponent implements OnInit, OnChanges, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges() {


  }
  ngAfterViewInit(){


      }

}
