import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupParams } from '../../app/interfaces/user-params';
import { ToastProvider } from '../../providers/toast/toast';
import { LoginParams } from '../../app/interfaces/LoginParams';
import { LoginResponse } from '../../app/interfaces/LoginResponse';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    public toast: ToastProvider
  ) {}

  onSignup(form: NgForm) {
    console.log(form.value);
    const signupParams: SignupParams = {
      username: form.value.username,
      password: form.value.password,
      email: form.value.email,
      full_name: form.value.fullname
    };
    const loginParams: LoginParams = {
      username: form.value.username,
      password: form.value.password
    }
    this.auth.signup(signupParams).subscribe(
      (res: any) => {
        localStorage.setItem('userId', res['user_id']);
        this.toast.show(res['message']);
        this.onSuccessfulSignup(loginParams);
      },
      err => {
        console.log(err.error.message);
        this.toast.show(err.error.message);
      });
  }

  onSuccessfulSignup(loginParams: LoginParams) {
    this.auth.login(loginParams).subscribe(
      (res: LoginResponse) => {
        localStorage.setItem('token', res.token);
        console.log(res.message);
        this.toast.show(res.message);
        this.navCtrl.setRoot(MenuPage);
    },
      err => {
        console.log(err.error.message);
        this.toast.show(err.error.message);
    });
  }
}
