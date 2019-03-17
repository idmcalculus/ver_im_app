import { Component, OnInit } from '@angular/core';
import {DatasharerService} from '../../core/datasharer/datasharer.service';
import {UserSession } from 'src/app/shared/models/UserSession';
import {User} from './../../shared/models/user';
import {UserService} from './user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  userSession:UserSession;
  userProfile:User;
  
  constructor(
    private dataSharer:DatasharerService,
    private userService:UserService
    ) { 
    this.dataSharer.setInProfileView(true);
  }



  ngOnInit(){
    const email = this.dataSharer.getEmail();
    this.userService.getProfileDetails(email)
      .subscribe(resp=>{
          if(resp.success){
            this.userProfile = resp.success.Data[0];
            this.dataSharer.setUserProfile(this.userProfile);
          }
      })
  }
}
