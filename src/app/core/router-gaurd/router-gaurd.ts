import { Injectable }     from '@angular/core';
import { CanActivate,Router,ActivatedRoute }    from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import {DatasharerService} from './../datasharer/datasharer.service';
import {UserSession} from '../../shared/models/UserSession';

@Injectable()
export class RouterGaurdService implements CanActivate {
usrSession:UserSession;
  constructor(
    // private cookieService: CookieService,
    private router: Router,
    private actvRouter:ActivatedRoute,
    private dataSharer:DatasharerService
  ) {}

  canActivate() {
    // if(this.cookieService.check('sessionID')){
        // if(this.cookieService.get('sessionID')==''){
        //   this.dataSharer.userSession.next(null);
        //   alert("Kindly login first");
          
        // }else{
        //   this.usrSession = this.dataSharer.getSession();
        //   this.dataSharer.setSession(this.usrSession);
        // }
    // }else{
    // alert("Kindly login first")
    //       this.router.navigate(['index']);
    // }
    // this.router.navigate(['home']);
    return true;
  }
}
