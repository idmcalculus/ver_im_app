import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {User} from '../../models/user';
import {AppAuthService} from './../../../core/auth/auth.service';
// import { AuthService } from "angular2-social-login";
// import { UserSession } from '../../models/UserSession';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
import { SocialLoginService } from '../../services/social-login.service';


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
    private authService:AppAuthService,
    private router:Router,
    private dynamicScriptLoader:DynamicScriptLoaderService,
    private socialLoginService:SocialLoginService

    // ngZone:NgZone
    ) { 
      // window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
    }

  ngOnInit() {
    this.installScript();
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
            // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
            window.location.href=`${UserDetails.user_category.toLowerCase()}`
          }
          this.loginText = "Login";
          resolve();
        });
      });
  }

  socialSignIn(){
      this.socialLoginService.googleInit();
  }

  socialSignOut(){
    this.socialLoginService.signOut();
  }

  

  // public socialLogin(provider){
  //   alert(provider)
  //   this.social_auth.login(provider).subscribe(
  //     (data) => {
  //                 console.log(data);
  //                 //user data
  //                 //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google)
  //               }
  //   )
  // }

  installScript(){
    this.dynamicScriptLoader.load('platform')
  }

  

}
