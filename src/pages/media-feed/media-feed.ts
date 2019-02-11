import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { TexttospeechProvider } from '../../providers/texttospeech/texttospeech';
import { UsersResponse } from '../../app/interfaces/UsersResponse';
import { UserPage } from '../user/user';
import { MediaPage } from '../media/media';

@IonicPage()
@Component({
  selector: 'page-media-feed',
  templateUrl: 'media-feed.html'
})
export class MediaFeedPage implements OnInit {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  mediaArray: MediaResponse[] = [];
  usersArr: UsersResponse[];
  profilePicArr: MediaResponse[];

  uploadedFileId: number;

  totalFilesOnServer: number;
  feedStatus = 'loading...';

  constructor(
    public navParams: NavParams,
    private navController: NavController,
    private http: HttpClient,
    private mediaProvider: MediaProvider,
    private auth: AuthProvider,
    private photoViewer: PhotoViewer,
    private app: App,
    private event: Events,
    private toast: ToastProvider,
    private tts: TexttospeechProvider
  ) {
    this.event.subscribe('new-upload', (fileId: number) => {
      console.log('Hello Im an event, and the file id is ', fileId);
      this.updateFeed(fileId);
    });
  }
  @ViewChild('loadTrigger') loadTrigger: ElementRef;

  ngOnInit() {
    this.http
      .get(this.baseUrl + 'media/all')
      .subscribe((res: AllMediaResponse) => {
        console.log('all files: ', res.file_count.total);
        this.totalFilesOnServer = res.file_count.total;
      });

    this.mediaProvider.getMediaInSegments(this.mediaArray.length).subscribe(
      (res: MediaResponse[]) => {
        console.log(res);
        this.mediaArray = res;
      },
      err => {
        console.log(err);
      }
    );

    // Fetch usernames from server
    this.mediaProvider.getAllUsers().subscribe(
      (res: UsersResponse[]) => {
        console.log(res);
        this.usersArr = res;
      },
      err => {
        console.log(err);
      }
    );

    // Fetch profile pics from server
    this.mediaProvider.getMediaByTag('profile').subscribe(
      (res: MediaResponse[]) => {
        console.log(this.profilePicArr);
        console.log(res);
        this.profilePicArr = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  ionViewDidLoad() {
    const lazyLoad = target => {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log('load trigger in view');
            if (this.totalFilesOnServer === this.mediaArray.length) {
              this.feedStatus = 'no more files on server';
              observer.disconnect();
            }
            this.loadMorePosts();
          }
        });
      });
      io.observe(target);
    };

    setTimeout(_ => {
      lazyLoad(this.loadTrigger.nativeElement);
    }, 200);
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

  loadMorePosts() {
    this.mediaProvider
      .getMediaInSegments(this.mediaArray.length)
      .subscribe((res: MediaResponse[]) => {
        this.mediaArray.push(...res);
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
      }
    );
  }

  onLogout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  getUsername(userId: number) {
    if (this.usersArr) {
      return this.usersArr
        .filter(user => user.user_id === userId)
        .map(user => user.username)[0];
    }
  }

  getProfilePic(userId: number) {
    if (this.profilePicArr) {
      return this.getThumbnail(
        this.profilePicArr
          .filter(item => item.user_id === userId)
          .map(item => item.filename)[0]
      );
    }
  }

  showImage(imageUrl) {
    const fullUrl = this.mediaUrl + imageUrl;
    this.photoViewer.show(fullUrl);
  }

  goToMediaPage(post: MediaResponse) {
    this.app.getRootNav().push(MediaPage, { 'post': post });
  }

  speakTitle(text: string) {
    console.log('Saying: ', text);
    this.tts.speak(text);
  }

  getThumbnail(filename: string) {
    if (filename !== undefined) return `${filename.split('.')[0]}-tn160.png`;
  }

  goToProfile(userId: number) {
    if (userId === +localStorage.getItem('userId')) {
      this.navController.parent.select(2);
    } else {
      this.app.getRootNav().push(UserPage, { 'userId': userId });
    }
  }
}
