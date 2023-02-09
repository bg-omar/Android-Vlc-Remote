import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.remotervlc.angularmobileapp',
  appName: 'angular-mobile-app',
  webDir: 'www',
  bundledWebRuntime: true,
  server: {
    cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
