import { Component } from '@angular/core';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MediaProvider } from '../../providers/media/media';
import { MediaResponse } from '../../app/interfaces/media-response';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  dataArray: MediaResponse[];

  constructor(
    private photoViewer: PhotoViewer,
    private mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    this.mediaProvider.getAllMedia().subscribe((res: MediaResponse[]) => {
      this.dataArray = res;
      this.dataArray.forEach(item => {
        this.mediaProvider
          .getMediaById(item.file_id.toString())
          .subscribe((singleRes: MediaResponse) => {
            item.thumbnails = singleRes.thumbnails;
          });
      });
    });
  }

  onViewImage(url: string) {
    this.photoViewer.show(this.mediaUrl + url);
  }
}
