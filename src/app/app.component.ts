import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { Cordova } from '@ionic-native/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    if (localStorage.getItem('token')) {
      this.rootPage = MenuPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if (platform.is('android')) {
        statusBar.styleDefault();
        statusBar.backgroundColorByHexString('#f8f8f8');
      }
      splashScreen.hide();
    })
    .catch(err => {
      console.log(err);
    });
  }
}
