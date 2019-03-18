import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import {AuthService} from './../../../core/auth/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  user:User={email:'',password:''};

  constructor(
    private authService:AuthService
    ) { 
      this.user = this.authService.currentUserValue
  }

  ngOnInit(){

  }

}
