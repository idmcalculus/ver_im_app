import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../../core/auth/auth.service';

import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html'
})
export class UserHeaderComponent implements OnInit {

  currentUserSubscription:Subscription
  userInfo:User={email:'',first_name:'',last_name:''};
  constructor(
    private router:Router,
    private authService:AuthService
    ) {
      this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
          this.userInfo = user;
      });
     }

  ngOnInit() {
  }

  logout(){
    if(confirm('Are you sure you want to logout')){
      this.authService.logout();
      this.router.navigate(['signin',{}]);
    }
  }

  ngOnDestroy(){

  }
}
