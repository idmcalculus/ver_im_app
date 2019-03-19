import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {User} from '../../models/user';
import {AuthService} from './../../../core/auth/auth.service';
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
    private authService:AuthService
    ) { }

  ngOnInit() {

  }


  signIn(): void {
      this.isSubmitting = new Promise((resolve, reject) => {
        this.loginText = "Authenticating...";
        this.authService.login(this.user)
        .subscribe(UserDetails => {
          if(UserDetails){
            this.user = UserDetails;
            alert(`Welcome ${this.user.first_name}`);
            var originUrl = window.location.pathname;
            if(originUrl=='/signin'){
              window.location.href='user';
            }else if(originUrl=='/admin/signin'){
              window.location.href='admin';
            }
          }
          this.loginText = "Login";
          resolve();
        });
      });
  }
}
