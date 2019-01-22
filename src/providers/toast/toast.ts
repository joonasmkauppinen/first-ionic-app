import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(public toast: ToastController) {}

  toastOptions(msg: string) {
    return {
      message: msg,
      duration: 3000,
      position: 'bottom'
    };
  }

  show(msg: string) {
    const toast = this.toast.create(this.toastOptions(msg));
    toast.onDidDismiss(_ => console.log('Dismissed toast.'));
    toast.present();
  }
}
