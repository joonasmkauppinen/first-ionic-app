import { Component } from '@angular/core';

import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(
    private auth: AuthProvider,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}

  async ionViewDidEnter() {
    console.log('Auth details: ', this.auth.getUserId(), this.auth.getToken());
  }

  onViewAuthDetails() {
    console.log('Auth details: ', this.auth.getUserId(), this.auth.getToken());
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
