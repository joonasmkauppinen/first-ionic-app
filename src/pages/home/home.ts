import { Component, OnInit } from '@angular/core';
import { Pic } from '../../app/interfaces/pic';

import testdata from './data';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  dataArray: Pic[];

  constructor(private photoViewer: PhotoViewer) {}

  ngOnInit() {
    this.dataArray = testdata;
  }

  onViewImage(url: string) {
    this.photoViewer.show(url);
  }
}
