import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { UserPage } from '../user/user';
import { MediaFeedPage } from '../media-feed/media-feed';

@IonicPage()
@Component({
  selector: 'page-menu',
  template: `
  <ion-tabs>
    <ion-tab [root]="mediaTab" tabTitle="feed" tabIcon="image"></ion-tab>
    <ion-tab [root]="userTab" tabTitle="profile" tabIcon="person"></ion-tab>
  </ion-tabs>
  `
})
export class MenuPage {
  userTab = UserPage;
  mediaTab = MediaFeedPage;
}
