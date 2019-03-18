import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// import {DatasharerService} from './../../../core/datasharer/datasharer.service';
import {AuthService} from './../../../core/auth/auth.service'
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html'
})
export class UserSideBarComponent implements OnInit {

  userSubscription:Subscription;
  userInfo:User = {email:'',password:'',user_category:'User'};
  constructor(
    private router:Router,
    private authService:AuthService
    ) {
      this.userSubscription = this.authService.currentUser.subscribe(userInfo =>{
        if(userInfo.email){
          this.userInfo = userInfo;
        }
      })
     }

  ngOnInit() {
    
  }

  logout(){
    if(confirm('Are you sure you want to logout')){
      this.authService.logout();
      this.router.navigate(['signin',{}]);
    }
  }

}
