import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider implements OnInit {
  private token = '';
  private userId: number = undefined;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  ngOnInit() {
    this.storage.get('token').then(val => this.token = val);
    this.storage.get('userId').then(val => this.userId = val);
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
