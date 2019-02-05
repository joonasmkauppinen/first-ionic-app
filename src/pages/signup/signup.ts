import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupParams } from '../../app/interfaces/user-params';
import { ToastProvider } from '../../providers/toast/toast';
import { LoginParams } from '../../app/interfaces/LoginParams';
import { LoginResponse } from '../../app/interfaces/LoginResponse';
import { MenuPage } from '../menu/menu';
import { UsernameValidator } from '../../validators/username';
import { PasswordValidator } from '../../validators/password';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  availableUsername = true;

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    public toast: ToastProvider,
    private formBuilder: FormBuilder,
    private usernameValidator: UsernameValidator
  ) {
    this.form = this.formBuilder.group({
      fullname: [
        '',
        Validators.compose([
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
        ])
      ],
      username: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9-_]*'),
          Validators.required
        ]),
        this.usernameValidator.checkUsername.bind(this)
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.required])
      ]
    },
    {
      validator: PasswordValidator.isMatching.bind(this)
    });
  }

  onSignup(form: FormGroup) {
    console.log(form.controls);
    const signupParams: SignupParams = {
      username: form.controls.username.value,
      password: form.controls.password.value,
      email: form.controls.email.value,
      full_name: form.controls.fullname.value
    };
    const loginParams: LoginParams = {
      username: form.controls.username.value,
      password: form.controls.password.value
    };
    this.auth.signup(signupParams).subscribe(
      (res: any) => {
        localStorage.setItem('userId', res['user_id']);
        this.toast.show(res['message']);
        this.onSuccessfulSignup(loginParams);
      },
      err => {
        console.log(err.error.message);
        this.toast.show(err.error.message);
      }
    );
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
      }
    );
  }
}
