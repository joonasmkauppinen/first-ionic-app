import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { LoginResponse } from '../../app/interfaces/LoginResponse';
import { catchError } from 'rxjs/operators';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  homePage = HomePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private toastCtrl: ToastController,
    private auth: AuthProvider,
    private storage: Storage
  ) {}

  // ngOnInit() {

  //   this.auth.getAuthDataFromStorage()
  //   .then(localData => {
  //     this.presentToast(`userId: ${localData[1]}, token: ${localData[0]}`);
  //   });

  //   // if (this.auth.getToken() !== '') {
  //   //   this.api.checkTokenValidity().subscribe(res => {
  //   //     this.navCtrl.push(this.homePage);
  //   //   },
  //   //   error => {
  //   //     this.presentToast(error);
  //   //   });
  //   // } else {
  //   //   this.presentToast('no auth credentials present');
  //   // }
  // }

  ionViewDidEnter() {
    console.log('Auth details: ', this.auth.getUserId(), this.auth.getToken());
    this.auth.getAuthDataFromStorage().then(localData => {
      this.presentToast(`userId: ${localData[1]} token: ${localData[0]}`);
    });
    // await this.storage.set('test', 'This is a test value stored to device memory');
    // await this.storage.get('test').then(val => this.presentToast(val));
  }

  onLogin(username: string, password: string) {
    console.log('Login with values: ', username, password);
    this.api
      .login({
        'username': username,
        'password': password
      })
      .subscribe(
        (res: LoginResponse) => {
          console.log(res);
          console.log(res.message);
          this.auth.setToken(res.token);
          this.auth.setUserid(res.user.user_id);
          this.navCtrl.push(this.homePage);
        },
        error => {
          console.log(error);
          this.presentToast('Login failed. Check username and password.');
        }
      );
  }

  onViewCredentials() {
    this.presentToast(`UserId: ${this.auth.getUserId()} Token: ${this.auth.getToken()}`);
  }

  presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
