import { Component, OnInit } from '@angular/core';
import { Pic } from '../../app/interfaces/pic';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClient } from '@angular/common/http';
import { MediaResponse } from '../../app/interfaces/media-response';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  baseUrl = 'http://media.mw.metropolia.fi/wbma/media';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  mediaArray: Pic[];

  constructor(private http: HttpClient, private photoViewer: PhotoViewer) {}

  ngOnInit() {
    this.http.get<any>(this.baseUrl).subscribe((res: MediaResponse[]) => {
      const data = res;
      this.mediaArray = data.map(item => {
        return {
          url: this.mediaUrl + item.filename,
          title: item.title,
          details: item.description
        };
      });
    });
  }

  onViewImage(url: string) {
    this.photoViewer.show(url);
  }
}
