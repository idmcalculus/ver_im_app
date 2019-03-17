import { Component, OnInit } from '@angular/core';
import {DatasharerService} from '../../core/datasharer/datasharer.service';
import { UserSession } from 'src/app/shared/models/UserSession';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  userSession:UserSession;
  
  constructor(
    private dataSharer:DatasharerService
    ) { 
    this.dataSharer.setInProfileView(true);
  }



  ngOnInit(){
    this.userSession = this.dataSharer.getSession();
    if(!this.userSession){
      console.log('session expired or not valid')
    }else{
      console.log('could not fetch session')
    }
}
}
