import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class MediaProvider {

  baseUrl = 'http://media.mw.metropolia.fi/wbma/media';


  constructor(public http: HttpClient, private auth: AuthProvider) {}

  getAllMedia() {
    return this.http.get(this.baseUrl);
  }

  getSingleMedia(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  uploadMedia(formData: FormData) {
    return this.http.post(this.baseUrl, formData, this.auth.httpOptions());
  }

}
