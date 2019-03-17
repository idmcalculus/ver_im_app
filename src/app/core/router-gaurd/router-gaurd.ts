import { Injectable }     from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  NavigationExtras,
  RouterStateSnapshot}                           from '@angular/router';
import {DatasharerService} from './../datasharer/datasharer.service';
import {UserSession} from '../../shared/models/UserSession';

@Injectable()
export class RouterGaurdService implements CanActivate {
usrSession:UserSession;
  constructor(
    private router: Router,
    private dataSharer:DatasharerService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.dataSharer.getAuthorizationToken) { return true; }
    return false;
  }

}
