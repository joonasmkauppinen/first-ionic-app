import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClientModule } from '@angular/common/http';
import { MediaProvider } from '../providers/media/media';
import { DigitransitProvider } from '../providers/digitransit/digitransit';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { ToastProvider } from '../providers/toast/toast';
import { SignupPage } from '../pages/signup/signup';
import { MenuPage } from '../pages/menu/menu';
import { UserPage } from '../pages/user/user';
import { MediaFeedPage } from '../pages/media-feed/media-feed';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';
import { UsernameValidator } from '../validators/username';
import { PasswordValidator } from '../validators/password';
import { FileUploadPage } from '../pages/file-upload/file-upload';
import { TexttospeechProvider } from '../providers/texttospeech/texttospeech';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    MenuPage,
    UserPage,
    MediaFeedPage,
    FileUploadPage,
    ThumbnailPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    MenuPage,
    UserPage,
    MediaFeedPage,
    FileUploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    PhotoViewer,
    TextToSpeech,
    MediaProvider,
    DigitransitProvider,
    AuthProvider,
    ToastProvider,
    UsernameValidator,
    PasswordValidator,
    TexttospeechProvider
  ]
})
export class AppModule {}
