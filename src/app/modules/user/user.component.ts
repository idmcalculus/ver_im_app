import { Component, OnInit } from '@angular/core';
// import {DatasharerService} from '../../core/datasharer/datasharer.service';
import {UserSession } from 'src/app/shared/models/UserSession';
import {User} from './../../shared/models/user';
import {AuthService} from './../../core/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
    private router:Router
    ){ 
      this.authService.setInProfileView(true);
    }

  ngOnInit(){
     this.authService.validateSession().then(resp=>{
       if(resp && resp.email){
        this.authService.setUser(resp)
       }
     })
  }

  ngOnDestroy() {
    
  }
}
