import { Component, OnInit } from '@angular/core';
// import {DatasharerService} from '../../core/datasharer/datasharer.service';
import {UserSession } from 'src/app/shared/models/UserSession';
import {User} from './../../shared/models/user';
import {UserService} from './user.service';
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
    private authService:AuthService,
    private userService:UserService
    ){ 
      this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
          this.userProfile = user;
      });
    }

  ngOnInit(){

  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
