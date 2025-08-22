
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.692334f5825d4f1591ff90ab8267a716',
  appName: 'agenda-unify-hub',
  webDir: 'dist',
  server: {
    url: 'https://692334f5-825d-4f15-91ff-90ab8267a716.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    }
  }
};

export default config;
