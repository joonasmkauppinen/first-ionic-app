import { Component } from '@angular/core';
import { IonicPage, NavController, Tab } from 'ionic-angular';
import { UserPage } from '../user/user';
import { MediaFeedPage } from '../media-feed/media-feed';
import { FileUploadPage } from '../file-upload/file-upload';

@IonicPage()
@Component({
  selector: 'page-menu',
  template: `
    <ion-tabs (ionChange)="onNewUpload($event)">
      <ion-tab [root]="mediaTab" tabTitle="feed" tabIcon="image"></ion-tab>
      <ion-tab tabTitle="new" tabIcon="add-circle"></ion-tab>
      <ion-tab [root]="userTab" tabTitle="profile" tabIcon="person"></ion-tab>
    </ion-tabs>
  `
})
export class MenuPage {
  userTab = UserPage;
  fileUploadTab = FileUploadPage;
  mediaTab = MediaFeedPage;

  constructor(private nav: NavController) {}

  onNewUpload(tab: Tab) {
    if (tab.index === 1) this.nav.push(this.fileUploadTab);
  }
}
