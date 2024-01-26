import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient , HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VlcComponent } from './vlc/vlc.component';
import { CalcComponent } from './calc/calc.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VlcComponent,
    CalcComponent
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
