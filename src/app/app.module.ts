import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient , HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VlcComponent } from './vlc/vlc.component';


import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    VlcComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot({
      animated: false,
    }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
