import { RouteInfo } from './RouteInfo';

export interface Stop {
  gtfsId: string;
  name: string;
  routes: RouteInfo[];
}
