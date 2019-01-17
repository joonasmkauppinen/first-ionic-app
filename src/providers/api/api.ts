import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoginParams } from '../../app/interfaces/LoginParams';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class ApiProvider implements OnInit {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  httpOptions: {};

  constructor(
    public http: HttpClient,
    private storage: Storage,
    private auth: AuthProvider
  ) {
    console.log('Hello ApiProvider Provider');
  }

  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.auth.getToken()
      })
    };
  }

  login(loginData: LoginParams) {
    return this.http.post(this.baseUrl + 'login', loginData);
  }

  checkTokenValidity() {
    const userUrl = this.baseUrl + 'users/' + this.auth.getUserId();
    return this.http.get(userUrl, this.httpOptions);
  }
}
