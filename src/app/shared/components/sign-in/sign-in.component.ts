import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {User} from '../../models/user';
import {DatasharerService} from './../../../core/datasharer/datasharer.service';
import { UserSession } from '../../models/UserSession';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user:User={email:'',password:''};
  isSubmitting;
  loginText:string="Login";
  constructor(
    private signInService: SignInService,
    private dataSharerService:DatasharerService) { }

  ngOnInit() {

  }


  signIn(): void {
      this.isSubmitting = new Promise((resolve, reject) => {
        this.loginText = "Authenticating...";
        this.signInService.login(this.user)
        .subscribe(UserDetails => {
          console.log(UserDetails)
          if(UserDetails){
            this.user = UserDetails;
            alert(`Welcome ${UserDetails.success.data.first_name}`);
            var userSession:UserSession = {token:UserDetails.success.token,email:UserDetails.success.data.email};
            this.dataSharerService.setSession(userSession);
            window.location.href = "user";
          }
          this.loginText = "Login";
          resolve();
        });
      });
    
  }
}
