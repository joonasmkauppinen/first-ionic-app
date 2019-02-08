import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class MediaProvider {

  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/media';


  constructor(public http: HttpClient, private auth: AuthProvider) {}

  getAllMedia() {
    return this.http.get(this.mediaUrl);
  }

  getSingleMedia(id: number) {
    return this.http.get(`${this.mediaUrl}/${id}`);
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

}
