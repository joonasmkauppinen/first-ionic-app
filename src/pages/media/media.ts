import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaResponse } from '../../app/interfaces/media-response';
import { UserPage } from '../user/user';

/**
 * Generated class for the MediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  postData: MediaResponse;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.postData = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaPage');
  }

  goToProfile(userId: number) {
    this.navCtrl.push(UserPage, { 'userId': userId });
  }

}
