import { Injectable }     from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  NavigationExtras,
  RouterStateSnapshot}                           from '@angular/router';
import {UserSession} from '../../shared/models/UserSession';
import {AuthService} from './../auth/auth.service';

@Injectable()
export class RouterGaurdService implements CanActivate {
usrSession:UserSession;
  constructor(
    private router: Router,
    private authService:AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.currentUserValue){
      return true;
    }else{
      this.router.navigate(['/signin']);
      return false;//try and redirect to origin
    }
    
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }


}
