import { Injectable }     from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  NavigationExtras,
  RouterStateSnapshot} from '@angular/router';
import {UserSession} from '../../shared/models/UserSession';
import {AppAuthService} from './../auth/auth.service';

@Injectable()
export class RouterGaurdService implements CanActivate {
usrSession: UserSession;
  constructor(
    private router: Router,
    private authService: AppAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
          console.log('hello',currentUser)
            return true;
        }
        // else{
        //   alert('Kindly Login First')
        //   this.router.navigate(['/signin'], {});
        //   return false
        // }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }


}
