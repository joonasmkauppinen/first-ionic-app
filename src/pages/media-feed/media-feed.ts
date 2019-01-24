import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import {
  AllMediaResponse,
  MediaResponse
} from '../../app/interfaces/media-response';

@IonicPage()
@Component({
  selector: 'page-media-feed',
  templateUrl: 'media-feed.html'
})
export class MediaFeedPage implements OnInit {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  mediaArray: MediaResponse[];

  constructor(
    public navParams: NavParams,
    private http: HttpClient,
    private auth: AuthProvider,
    private app: App
  ) {}

  ngOnInit() {
    this.http
      .get(this.baseUrl + 'media/all')
      .subscribe((res: AllMediaResponse) => {
        console.log(res);
        console.log('all files: ', res.file_count.total);
        const fileCount = res.file_count.total;
        this.getAllMedia(fileCount);
      });
  }

  getAllMedia(limit: number) {
    const param = new HttpParams().set('limit', limit.toString());
    this.http
      .get(this.baseUrl + 'media', { headers: {}, params: param })
      .subscribe((res: MediaResponse[]) => {
        console.log(res);
        this.mediaArray = res;
      });
  }

  onLogout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }
}
