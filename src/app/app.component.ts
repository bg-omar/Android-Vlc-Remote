import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import {GetResult, Preferences} from '@capacitor/preferences';

import { UserData } from './providers/user-data';
import { Storage } from '@ionic/storage-angular';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'vlc',
      url: '/app/tabs/vlc',
      icon: 'easel'
    },
    {
      title: 'Account',
      url: '/app/tabs/account',
      icon: 'people'
    }
  ];
  loggedIn = false;
  dark = true;
  title = this.appPages
  passvalue: string;

  constructor(
    private menu: MenuController,
    private platform: Platform,
  ) {
    this.initializeApp();
  }



  async ngOnInit() {

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        StatusBar.hide();
        SplashScreen.hide();
      }
    });

    const getConfig = async () => {
      return  await Preferences.get({ key: 'pass' });
    };


    const setDefaultConfig = async () => {
      if (!this.passvalue) {
        this.passvalue = prompt('Please enter your VLC password: ', '') || '1z2x';
      }
      if (this.passvalue) {
        await Preferences.set({
          key: 'pass',
          value: this.passvalue,
        });
      }
    };

    function checkConfig(r: GetResult) {
      console.log("checking passvalue")
      console.log(r)
      if (r.value == null) {
        setDefaultConfig().then(r => getConfig());
      } else {
        console.log("Value: ", r.value)
      }
    }

    getConfig().then(r => checkConfig(r));
  }

  // Check/uncheck the toggle and update the theme based on isDark
  initializeDarkTheme(isDark) {
    this.dark = isDark;
    this.toggleDarkTheme(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark theme
  toggleChange(ev) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
