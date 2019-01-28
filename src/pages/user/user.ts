import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';
import { SignupParams } from '../../app/interfaces/user-params';
import { LoginPage } from '../login/login';
import { MediaResponse } from '../../app/interfaces/media-response';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage implements OnInit {

  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  avatarUrl = 'loading';

  fullname: string;
  username: string;
  userid: string;
  email: string;

  constructor(
    public navParams: NavParams,
    private http: HttpClient,
    private auth: AuthProvider,
    private toast: ToastProvider,
    private app: App
  ) {}

  ngOnInit() {
    const userUrl = `${this.baseUrl}users/${localStorage.getItem('userId')}`;
    this.http.get(userUrl, this.auth.httpOptions()).subscribe(
      (res: SignupParams) => {
        console.log(res);
        this.username = res.username;
        this.userid = res.user_id.toString();
        this.email = res.email;
        this.fullname = res.full_name;
      },
      err => {
        console.log(err);
        this.toast.show(err.error.message);
      }
    );
  }

  ionViewDidLoad() {
    this.getProfilePic();
  }

  onLogout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  getProfilePic() {
    this.http.get(this.baseUrl + 'tags/profile').subscribe((res: MediaResponse[]) => {
      this.avatarUrl = res
        .filter(item => item.user_id.toString() === localStorage.getItem('userId'))
        .map(user => user.filename)[0];
    });
  }
}
