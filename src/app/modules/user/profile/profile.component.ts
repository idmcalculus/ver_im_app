import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import {AuthService} from './../../../core/auth/auth.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  user:User={email:'',password:''};
  userSubscription:Subscription;
  
  constructor(
    private authService:AuthService
    ) { 
      this.userSubscription = this.authService.currentUser.subscribe(userInfo =>{
        this.user = userInfo;
      })
  }

  ngOnInit(){

  }

  ngOnDestroy(){
      this.userSubscription.unsubscribe()
  }

}
