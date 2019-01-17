import { Component } from '@angular/core';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(
    private auth: AuthProvider
  ) {}

  ionViewDidEnter() {
    console.log('Auth details: ', this.auth.getUserId(), this.auth.getToken());
  }

  onViewAuthDetails() {
    console.log('Auth details: ', this.auth.getUserId(), this.auth.getToken());
  }

}
