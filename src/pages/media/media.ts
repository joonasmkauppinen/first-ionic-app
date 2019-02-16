import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, LoadingController, Events } from 'ionic-angular';
import { MediaResponse } from '../../app/interfaces/media-response';
import { UserPage } from '../user/user';
import { PopoverPage } from '../popover/popover';
import { MediaProvider } from '../../providers/media/media';
import { EditPostPage } from '../edit-post/edit-post';

/**
 * Generated class for the MediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const POPOVER_EDIT = 'edit';
const POPOVER_DELETE = 'delete';

@Component({
  selector: 'page-media',
  templateUrl: 'media.html'
})
export class MediaPage {

  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  myUserId: number;
  postData: MediaResponse;

  eventPublished = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popover: PopoverController,
    private mediaProvider: MediaProvider,
    private alert: AlertController,
    private spinner: LoadingController,
    private event: Events
  ) {
    this.myUserId = +localStorage.getItem('userId');
    this.postData = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaPage');
  }

  ionViewDidLeave() {
    if (!this.eventPublished) this.event.publish('post-deleted', false);
  }

  getUsername(userId: number) {
    return this.mediaProvider.getUsernameById(userId);
  }

  getProfilePic(userId: number) {
    return this.mediaProvider.getProfilePicById(userId);
  }

  goToProfile(userId: number) {
    this.navCtrl
      .push(UserPage, { 'userId': userId })
      .catch(err => console.log(err));
  }

  showPopover(event: Event) {
    const popover = this.popover.create(PopoverPage);

    popover
      .present({
        ev: event
      })
      .catch(err => console.log(err));

    popover.onDidDismiss(data => {
      console.log('Data from popover: ', data);

      switch (data) {
        case POPOVER_EDIT: {
          this.navCtrl.push(EditPostPage, { 'post': this.postData }).catch(err => console.log(err));
          break;
        }
        case POPOVER_DELETE: {
          this.presentConfirm();
          break;
        }
      }
    });
  }

  presentConfirm() {
    const alert = this.alert.create({
      title: 'Delete post?',
      message: 'This will permanently delete your post.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel pressed');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deletePost(this.postData.file_id);
          }
        }
      ]
    });
    alert.present().catch(err => console.log(err));
  }

  deletePost(fileId: number) {
    const deleting = this.spinner.create({
      content: 'Deleting post...'
    });

    deleting.present().catch(err => console.log(err));

    console.log('deleting media...');
    this.mediaProvider.deleteMedia(fileId).subscribe(res => {
      this.eventPublished = true;
      console.log(res);
      setTimeout(() => {
        this.navCtrl.pop().then(() => {
          this.event.publish('post-deleted', true);
        }).catch(err => console.log(err));
        deleting.dismiss().catch(err => console.log(err));
      }, 500);
    },
    err => {
      console.log(err);
    });
  }
}
