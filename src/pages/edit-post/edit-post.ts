import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';
import { MediaResponse } from '../../app/interfaces/media-response';
import { NgForm } from '@angular/forms';
import { MediaProvider } from '../../providers/media/media';

@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html'
})
export class EditPostPage {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  postData: MediaResponse;
  newPostInfo = {
    title: '',
    description: ''
  };

  infoChanged = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private spinner: LoadingController
  ) {
    this.postData = this.navParams.get('post');
    this.newPostInfo.title = this.postData.title;
    this.newPostInfo.description = this.postData.description;
    console.log('post data: ', this.postData);
  }

  updatePostInfo() {
    console.log('submit');

    const updating = this.spinner.create({
      content: 'Updating info...'
    });
    updating.present().catch(err => console.log(err));

    this.mediaProvider
      .updatePostInfo(this.postData.file_id, this.newPostInfo)
      .subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            updating.dismiss().catch();
            this.navCtrl.popToRoot().catch();
          }, 800);
        },
        err => {
          console.error(err);
          updating.dismiss().catch();
        }
      );
  }

  checkIsInfoChanged() {
    if (this.postData.title !== this.newPostInfo.title) {
      this.infoChanged = true;
    } else if (this.postData.description !== this.newPostInfo.description) {
      this.infoChanged = true;
    } else {
      this.infoChanged = false;
    }
  }
}
