import { Injectable }     from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  NavigationExtras,
  RouterStateSnapshot}                           from '@angular/router';
import {UserSession} from '../../shared/models/UserSession';
import {AuthService} from './../auth/auth.service';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class RouterGaurdService implements CanActivate {
usrSession:UserSession;
  constructor(
    private router: Router,
    private authService:AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            return true;
        }
        this.router.navigate(['/signin'], {});
        return false
    
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }


}
