import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Browser } from '@capacitor/browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import "jquery";

declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;


@Component({
  selector: 'app-vlc',
  templateUrl: './vlc.component.html',
  styleUrls: ['./vlc.component.scss']
})
export class VlcComponent {
  title = 'angularCapacitor';
  image = '';
  constructor(private http: HttpClient){}
  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
    });

    if (image) {
      this.image = `data:image/jpeg;base64,${image.base64String}`!;
    }
  }

}
