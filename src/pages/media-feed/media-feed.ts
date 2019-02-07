import { Component, OnInit } from '@angular/core';
import {
  App,
  IonicPage,
  NavController,
  NavParams,
  Events
} from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import {
  AllMediaResponse,
  MediaResponse
} from '../../app/interfaces/media-response';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MediaProvider } from '../../providers/media/media';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-media-feed',
  templateUrl: 'media-feed.html'
})
export class MediaFeedPage implements OnInit {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  mediaArray: MediaResponse[];

  uploadedFileId: number;

  constructor(
    public navParams: NavParams,
    private http: HttpClient,
    private mediaProvider: MediaProvider,
    private auth: AuthProvider,
    private photoViewer: PhotoViewer,
    private app: App,
    private event: Events,
    private toast: ToastProvider
  ) {
    this.event.subscribe('new-upload', (fileId: number) => {
      console.log('Hello Im an event, and the file id is ', fileId);
      this.updateFeed(fileId);
    });
  }

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

  updateFeed(id: number) {
    console.log('updating feed...');
    this.mediaProvider.getSingleMedia(id).subscribe(
      (res: MediaResponse) => {
        this.mediaArray.unshift(res);
      },
      err => {
        console.log(err);
        this.toast.show(err.message);
      });
  }

  onLogout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  showImage(imageUrl) {
    const fullUrl = this.mediaUrl + imageUrl;
    this.photoViewer.show(fullUrl);
  }
}
