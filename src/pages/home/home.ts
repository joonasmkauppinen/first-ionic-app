import { Component } from '@angular/core';
import { Pic } from '../../app/interfaces/pic';

import { DigitransitProvider } from '../../providers/digitransit/digitransit';
import { Stops } from '../../app/interfaces/Stops';
import { RouteInfo } from '../../app/interfaces/RouteInfo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  dataArray: Pic[];
  routesArray: RouteInfo[];

  constructor(
    private digitransitProvider: DigitransitProvider
  ) {}

  onSearchRoutes(stopName: string) {
    this.digitransitProvider.getRoutesGoingToStop(stopName).subscribe((res: any) => {
      console.log(res);
      const data = res['data'];
      const stops: Stops = data['stops'];
      console.log('Stops: ', stops);
      const routesInfo = stops[0];
      const routes = routesInfo['patterns'];
      console.log('Rouets: ', routes);
      this.routesArray = routes;
    });
  }
}
