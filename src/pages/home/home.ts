import { Component, OnInit } from '@angular/core';
import { Pic } from '../../app/interfaces/pic';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MediaProvider } from '../../providers/media/media';
import { MediaResponse } from '../../app/interfaces/media-response';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  dataArray: Pic[];

  constructor(
    private photoViewer: PhotoViewer,
    private mediaProvider: MediaProvider
  ) {}

  ngOnInit() {
    this.mediaProvider.getAllMedia().subscribe((res: MediaResponse[]) => {
      console.log(res);
      this.dataArray = res.map(item => {
        const fileOriginal = this.mediaUrl + item.filename;
        const fileThumnail = this.mediaUrl + this.changeToThumnail(item.filename);
        return {
          original: fileOriginal,
          thumbnail: fileThumnail,
          title: item.title,
          details: item.description
        };
      });
    });
  }

  changeToThumnail(filename) {
    const slicedFilename = filename.split('.');
    console.log(slicedFilename);
    const thumbnail = `${slicedFilename[0]}-tn160.png`;
    console.log(thumbnail);
    return thumbnail;
  }
  onViewImage(url: string) {
    this.photoViewer.show(url);
  }
}
