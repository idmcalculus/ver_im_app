import { Component, OnInit } from '@angular/core';
import {DatasharerService} from '../../../core/datasharer/datasharer.service';
import { User } from 'src/app/shared/models/User';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  user:User={email:'',password:''};

  constructor(
    private dataSharer:DatasharerService
    ) { 
    this.dataSharer.userProfile.subscribe(userProfile => {
      this.user = userProfile;
    })
  }

  ngOnInit(){

  }

}
