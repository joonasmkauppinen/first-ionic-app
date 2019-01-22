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

  ionViewDidEnter() {
    this.auth.loadLocalData()
    .then(_ => {
      if (this.auth.getToken() !== '') {
        this.navCtrl.push(this.homePage);
      } else {
        this.presentToast('No auth token present. Login.');
      }
    });
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
