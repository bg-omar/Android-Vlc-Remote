import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient , HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VlcComponent } from './vlc/vlc.component';


import { IonicModule } from '@ionic/angular';
import {IframeComponent} from "./iframe/iframe.component";
import {BgTabsModule} from "./tab-switch/tabs/tabs.module";
import {BgBadgeModule} from "./badge/badge.module";
import {BgTabSwitchModule} from "./tab-switch/tab-switch.module";
import {BgIconModule} from "./icon/icon.module";
import {BgInputModule} from "./input/input.module";
import {BgDirectivesModule} from "./directive/directives.module";
import {BgScrollNavModule} from "./scroll-nav/scroll-nav.module";

@NgModule({
  declarations: [
    AppComponent,
    VlcComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BgBadgeModule,
    BgTabsModule,
    BgTabSwitchModule,
    BgIconModule,
    BgInputModule,
    BgDirectivesModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot({
      animated: false,
    }),
    IframeComponent,
    BgScrollNavModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
