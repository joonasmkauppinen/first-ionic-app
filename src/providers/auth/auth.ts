import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Injectable()
export class AuthProvider {
  private token = '';
  private userId: number = undefined;
  private localToken = this.storage.get('token');
  private localUserId = this.storage.get('userId');

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  async getAuthDataFromStorage(): Promise<any> {
    return Promise.all([this.localToken, this.localUserId]).then(localData => {
      this.token = localData[0];
      this.userId = localData[1];
      return localData;
      // this.presentToast(`userId: ${this.userId}, token: ${this.token}`);
    });
  }

  setToken(value: string) {
    this.token = value;
    this.storage.set('token', value);
  }

  setUserid(value: number) {
    this.userId = value;
    this.storage.set('userId', value);
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }
}
