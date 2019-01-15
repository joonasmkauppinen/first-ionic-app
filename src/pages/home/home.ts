import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/Observable/forkJoin';

class Pic {
  constructor(
    public title: string,
    public details: string,
    public thumbnail: string,
    public original: string
  ) {}
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private options = {
    headers: {
      'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywidXNlcm5hbWUiOiJqYXNrYWpvb25hcyIsImVtYWlsIjoiam9vbmFzLmthdXBwaW5lbjJAbWV0cm9wb2xpYS5maSIsImZ1bGxfbmFtZSI6bnVsbCwiaXNfYWRtaW4iOm51bGwsInRpbWVfY3JlYXRlZCI6IjIwMTktMDEtMTRUMTI6NTM6MjUuMDAwWiIsImlhdCI6MTU0NzUzOTUwNywiZXhwIjoxNTQ5NjEzMTA3fQ.2pY0-aE-dEyQWli0lK37nT_EJiEIgY3_c9KCuSNXQBg'
    }
  };
  usersArray = [];
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  mediaArray = [];

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private photoViewer: PhotoViewer
  ) {}

  ngOnInit() {
    const users = this.http.get<any>(
      'http://media.mw.metropolia.fi/wbma/users',
      this.options
    );
    const media = this.http.get<any>('http://media.mw.metropolia.fi/wbma/media');

    forkJoin([users, media]).subscribe(results => {
      this.usersArray = results[0];
      this.mediaArray = results[1].map(item => {
        return {
          user_id: item['user_id'],
          url: this.mediaUrl + item['filename'],
          title: item['title'],
          description: item['description']
        };
      });
      console.log(this.usersArray);
      console.log(this.mediaArray);
    });

    // this.http
    //   .get<any>('http://media.mw.metropolia.fi/wbma/users', this.options)
    //   .subscribe(data => {
    //     this.usersArray = data;
    //     console.log(this.usersArray);
    //   });

    // this.http
    //   .get<any>('http://media.mw.metropolia.fi/wbma/media')
    //   .subscribe(data => {
    //     this.apiArray = data.map(dataItem => {
    //       return {
    //         url: this.mediaUrl + dataItem['filename']
    //       };
    //     });
    //   });
  }

  getUsername(userId) {
    return this.usersArray
      .filter(user => user.user_id === userId)
      .map(user => user.username);
  }

  getEmali(userId) {
    return this.usersArray
      .filter(user => user.user_id === userId)
      .map(user => user.email);
  }

  viewPhoto(imgUrl: string, imgTitle: string) {
    this.photoViewer.show(imgUrl, imgTitle, { share: true });
  }
}
