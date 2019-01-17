import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DigitransitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DigitransitProvider {

  digitransitUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getHttpBody(stopName: string) {
    return {
      'query': `{
        stops(name: "${stopName}") {
          gtfsId
          name
          lat
          lon
          patterns {
            code
            directionId
            headsign
            route {
              gtfsId
              shortName
              longName
              mode
            }
          }
        }
      }`
    };
  }

  constructor(public http: HttpClient) {}

  getRoutesGoingToStop(stopName: string) {
    console.log('making request with value: ', stopName);
    return this.http.post(this.digitransitUrl, this.getHttpBody(stopName), this.httpOptions);
  }

}
