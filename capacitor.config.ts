import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ayham.hamchado',
  appName: 'ARH app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
