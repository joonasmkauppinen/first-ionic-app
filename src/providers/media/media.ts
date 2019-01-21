import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MediaProvider {

  baseUrl = 'http://media.mw.metropolia.fi/wbma/media';


  constructor(public http: HttpClient) {}

  getAllMedia() {
    return this.http.get(this.baseUrl);
  }

  getMediaById(id: string) {
    return this.http.get(this.baseUrl + `/${id}`);
  }

}
