import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient , HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import {environment} from "../../ionic-conference-app-master/src/environments/environment";
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [HttpClient, InAppBrowser],
  bootstrap: [AppComponent]
})
export class AppModule { }
