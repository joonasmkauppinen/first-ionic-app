import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Injectable()
export class AuthProvider {
  private token = '';
  private userId: number = undefined;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  async loadLocalData() {
    this.token = await this.storage.get('token');
    this.userId = await this.storage.get('userId');
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
