import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import {AuthService} from './../../../core/auth/auth.service';
import {UserService} from './../user.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  user:User={email:'',password:''};
  userSubscription:Subscription;
  isSubmitting;
  constructor(
    private authService:AuthService,
    private userService:UserService
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

  updateProfile(){
      this.user.gender ='Male'
      this.user.user_category ='User'
      this.user.authentication_type ='E'

      this.isSubmitting = this.userService.updateProfile(this.user).subscribe(resp=>{
        if(resp.success){
          alert(resp.success.Message)
        }
      });
  }

}
