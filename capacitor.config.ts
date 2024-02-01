import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.omariskandarani.vlcremote',
  appName: 'vlc-remote',
  webDir: 'www',
  bundledWebRuntime: true,
  server: {
    androidScheme: "https",
    iosScheme: "ionic",
    cleartext: true,
    allowNavigation: [
      "*"
    ]
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorSQLite: {
      iosDatabaseLocation: "Library/CapacitorDatabase"
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
