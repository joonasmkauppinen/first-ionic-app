import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginParams, SignupParams } from '../../app/interfaces/user-params';

@Injectable()
export class AuthProvider {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(public http: HttpClient) {}

  httpOptions() {
    return {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
  }

  signup(user: SignupParams) {
    return this.http.post(this.baseUrl + 'users', user);
  }

  login(user: LoginParams) {
    const loginInfo = { 'username': user.username, 'password': user.password };
    return this.http.post(this.baseUrl + 'login', loginInfo);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  checkUsername(username: string) {
    console.log('Checking availability for username: ', username);
    const checkUsernameUrl = `${this.baseUrl}users/username/${username}`;
    return this.http.get(checkUsernameUrl);
  }
}
