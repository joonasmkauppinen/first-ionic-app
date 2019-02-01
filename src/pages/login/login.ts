import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginParams } from '../../app/interfaces/user-params';
import { LoginResponse } from '../../app/interfaces/LoginResponse';
import { ToastProvider } from '../../providers/toast/toast';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    public toast: ToastProvider
  ) {}

  onLogin(form: NgForm) {
    console.log(form.value);
    const loginParams: LoginParams = {
      username: form.value.username,
      password: form.value.password
    };
    this.auth.login(loginParams).subscribe(
      (res: LoginResponse) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.user.user_id.toString());
        console.log(res.message);
        this.toast.show(res.message);
        this.navCtrl.setRoot(MenuPage);
      },
      err => {
        console.log(err);
        this.toast.show(err.error.message);
      }
    );
  }

  onSignUp() {
    this.navCtrl.setRoot(SignupPage);
  }
}
