import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VlcComponent } from './vlc/vlc.component';
import { CalcComponent } from './calc/calc.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VlcComponent,
    CalcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
