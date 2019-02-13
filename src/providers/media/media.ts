import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class MediaProvider {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/media/';

  constructor(public http: HttpClient, private auth: AuthProvider) {}

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
    return this.http.get(this.baseUrl + 'users', this.auth.httpOptions());
  }

  getMediaByTag(tag: string) {
    return this.http.get(this.baseUrl + 'tags/' + tag, this.auth.httpOptions());
  }

  getUserMedia(userId: number) {
    return this.http.get(`${this.mediaUrl}user/${userId}`, this.auth.httpOptions());
  }

  getUserInfo(userId: number) {
    return this.http.get(`${this.baseUrl}users/${userId}`, this.auth.httpOptions());
  }

  deleteMedia(fileId: number) {
    return this.http.delete(this.mediaUrl + fileId, this.auth.httpOptions());
  }

  updatePostInfo(postId: number, body: {}) {
    return this.http.put(this.mediaUrl + postId, body, this.auth.httpOptions());
  }
}
