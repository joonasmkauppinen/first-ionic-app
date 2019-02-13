import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Popover } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Chooser } from '@ionic-native/chooser';
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
import { MediaPage } from '../pages/media/media';
import { PopoverPage } from '../pages/popover/popover';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    MenuPage,
    UserPage,
    MediaFeedPage,
    FileUploadPage,
    ThumbnailPipe,
    MediaPage,
    PopoverPage
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
    FileUploadPage,
    MediaPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    PhotoViewer,
    Chooser,
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
