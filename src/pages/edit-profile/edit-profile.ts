import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { SignupParams } from '../../app/interfaces/user-params';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileUpdateEvent } from '../../app/interfaces/ProfileUpdateEvent';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

  userInfo: SignupParams;

  eventPublished = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private event: Events,
    private spinner: LoadingController
  ) {
    this.userInfo = this.navParams.get('userInfo');
    console.log('User info: ', this.userInfo);
  }

  ionViewDidLeave() {
    if (!this.eventPublished) this.event.publish('profile-update', { wasUpdated: false });
  }

  updateProfileInfo() {

    const updating = this.spinner.create({
      content: 'Updating profile info...'
    });
    updating.present().catch(err => console.log(err));

    this.auth.updateProfileInfo(this.userInfo).subscribe(res => {
      console.log(res);
      const profileUpdate: ProfileUpdateEvent = {
        wasUpdated: true,
        info: this.userInfo
      };
      this.event.publish('profile-update', profileUpdate);
      setTimeout(() => {
        this.navCtrl.popToRoot().catch();
        updating.dismiss().catch();
      }, 800);
    },
    err => {
      console.log(err);
      updating.dismiss().catch();
    });
  }
}
