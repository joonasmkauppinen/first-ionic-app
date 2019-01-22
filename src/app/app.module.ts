import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClientModule } from '@angular/common/http';
import { MediaProvider } from '../providers/media/media';
import { DigitransitProvider } from '../providers/digitransit/digitransit';
import { LoginPage } from '../pages/login/login';
import { ApiProvider } from '../providers/api/api';
import { AuthProvider } from '../providers/auth/auth';
import { ToastProvider } from '../providers/toast/toast';

@NgModule({
  declarations: [MyApp, LoginPage, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, LoginPage, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    PhotoViewer,
    MediaProvider,
    DigitransitProvider,
    ApiProvider,
    AuthProvider,
    ToastProvider
  ]
})
export class AppModule {}
