import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { UsersResponse } from '../../app/interfaces/UsersResponse';
import { MediaResponse } from '../../app/interfaces/media-response';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class MediaProvider {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/media/';

  usernameArr: UsersResponse[];
  profilePicArr: MediaResponse[];

  constructor(public http: HttpClient, private auth: AuthProvider) {
    forkJoin(this.getAllUsers(), this.getMediaByTag('profile')).subscribe(
      ([users, profilePics]) => {
        console.log('Successully fetched usernames and profile pics');
        console.log('users ', users);
        console.log('profile pics ', profilePics);
        this.usernameArr = users;
        this.profilePicArr = profilePics;
      }
    );
  }

  requestParams(start: number, limit: number) {
    return {
      params: new HttpParams()
        .set('start', start.toString())
        .set('limit', limit.toString())
    };
  }

  getAllMedia() {
    return this.http.get(this.mediaUrl);
  }

  getMediaInSegments(start = 0, limit = 20) {
    return this.http.get(this.mediaUrl, this.requestParams(start, limit));
  }

  getSingleMedia(id: number) {
    return this.http.get(`${this.mediaUrl}${id}`);
  }

  uploadMedia(formData: FormData) {
    return this.http.post(this.mediaUrl, formData, this.auth.httpOptions());
  }

  getAllUsers() {
    return this.http.get<UsersResponse[]>(
      this.baseUrl + 'users',
      this.auth.httpOptions()
    );
  }

  getMediaByTag(tag: string) {
    return this.http.get<MediaResponse[]>(
      this.baseUrl + 'tags/' + tag,
      this.auth.httpOptions()
    );
  }

  getUserMedia(userId: number) {
    return this.http.get(
      `${this.mediaUrl}user/${userId}`,
      this.auth.httpOptions()
    );
  }

  getUserInfo(userId: number) {
    return this.http.get(
      `${this.baseUrl}users/${userId}`,
      this.auth.httpOptions()
    );
  }

  deleteMedia(fileId: number) {
    return this.http.delete(this.mediaUrl + fileId, this.auth.httpOptions());
  }

  updatePostInfo(postId: number, body: {}) {
    return this.http.put(this.mediaUrl + postId, body, this.auth.httpOptions());
  }

  getUsernameById(userId: number) {
    if (this.usernameArr) {
      return this.usernameArr
        .filter(user => user.user_id === userId)
        .map(user => user.username)[0];
    }
  }

  getProfilePicById(userId: number) {
    if (this.profilePicArr) {
      return this.getThumbnail(
        this.profilePicArr
          .filter(item => item.user_id === userId)
          .map(item => item.filename)[0]
      );
    }
  }

  getTagsByFileId(fileId: number) {
    return this.http.get(this.baseUrl + 'tags/file/' + fileId);
  }

  private getThumbnail(filename: string) {
    if (filename !== undefined) return `${filename.split('.')[0]}-tn160.png`;
  }
}
