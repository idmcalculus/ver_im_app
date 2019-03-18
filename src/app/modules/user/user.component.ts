import { Component, OnInit } from '@angular/core';
// import {DatasharerService} from '../../core/datasharer/datasharer.service';
import {UserSession } from 'src/app/shared/models/UserSession';
import {User} from './../../shared/models/user';
import {AuthService} from './../../core/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  userSession:UserSession;
  userProfile:User;
  currentUserSubscription:Subscription;
  constructor(
    private authService:AuthService
    ){ 
      this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
          this.userProfile = user;
      });
    }

  ngOnInit(){
     this.authService.setInProfileView(true);
  }

  ngOnDestroy() {
     this.currentUserSubscription.unsubscribe();
  }
}
