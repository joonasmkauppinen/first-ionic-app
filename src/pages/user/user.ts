import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';
import { SignupParams } from '../../app/interfaces/user-params';
import { LoginPage } from '../login/login';
import { MediaResponse } from '../../app/interfaces/media-response';
import { MediaProvider } from '../../providers/media/media';
import { MediaPage } from '../media/media';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage implements OnInit {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  avatarUrl = '';

  userId: number;
  profileInfo: SignupParams;
  userMedia: MediaResponse[];

  clickedPostIndex: number;

  constructor(
    public navParams: NavParams,
    private http: HttpClient,
    private auth: AuthProvider,
    private toast: ToastProvider,
    private mediaProvider: MediaProvider,
    private app: App,
    private event: Events
  ) {}

  ngOnInit() {
    this.userId =
      this.navParams.get('userId') || +localStorage.getItem('userId');
    this.getProfileInfo(this.userId);
    this.getProfileMedia(this.userId);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    if (this.navParams.get('postDeleted')) {
      console.log('TODO: update post grid...');
    }
  }

  ionViewDidLoad() {
    this.getProfilePic();
  }

  onLogout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  getProfilePic() {
    this.http
      .get(this.baseUrl + 'tags/profile')
      .subscribe((res: MediaResponse[]) => {
        this.avatarUrl = res
          .filter(item => item.user_id === this.userId)
          .map(user => user.filename)[0];
      });
  }

  getProfileInfo(userId: number) {
    this.mediaProvider.getUserInfo(userId).subscribe((res: SignupParams) => {
      this.profileInfo = res;
    });
  }

  getProfileMedia(userId: number) {
    this.mediaProvider.getUserMedia(userId).subscribe(
      (res: MediaResponse[]) => {
        console.log(res);
        this.userMedia = res;
        this.userMedia.reverse();
      },
      err => {
        console.log(err);
      }
    );
  }

  onItemClick(post: MediaResponse, index: number) {

    console.log('subscribing to post-deleted');
    this.event.subscribe('post-deleted', (wasDeleted: boolean) => {
      console.log('wasDeleted: ', wasDeleted);
      if (wasDeleted) {
        console.log('post deleted, updating media grid...');
        console.log('clicked post index: ', this.clickedPostIndex);
        this.userMedia.splice(this.clickedPostIndex, 1);
      }
      console.log('unsubscribing post-deleted');
      this.event.unsubscribe('post-deleted');
    });

    this.clickedPostIndex = index;
    this.goToMediaPage(post);
  }

  goToMediaPage(post: MediaResponse) {
    console.log('navigating to media page...');
    this.app.getRootNav().push(MediaPage, { 'post': post });
  }

  isMyProfile() {
    return this.userId === +localStorage.getItem('userId');
  }
}
