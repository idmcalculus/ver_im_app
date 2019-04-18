import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {User} from '../../models/user';
import {AuthService} from './../../../core/auth/auth.service';
import { UserSession } from '../../models/UserSession';
import { Router } from '@angular/router';

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
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit() {

  }


  signIn(): void {
      this.isSubmitting = new Promise((resolve, reject) => {
        this.loginText = "Authenticating...";
        var originUrl = window.location.pathname;
        
        this.authService.login(this.user)
        .subscribe(UserDetails => {
          if(UserDetails){
            this.user = UserDetails;
            alert(`Welcome ${this.user.first_name}`);
            this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
          }
          this.loginText = "Login";
          resolve();
        });
      });
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
}
