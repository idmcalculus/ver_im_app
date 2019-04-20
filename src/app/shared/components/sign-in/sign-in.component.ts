import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {User} from '../../models/user';
import {AuthService} from './../../../core/auth/auth.service';
// import { UserSession } from '../../models/UserSession';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
declare const gapi: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public auth2: any;
  user:User={email:'',password:''};
  isSubmitting;
  loginText:string="Login";
  constructor(
    private signInService: SignInService,
    private authService:AuthService,
    private router:Router,
    private dynamicScriptLoader:DynamicScriptLoaderService,
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


  public signOut() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.getAuthInstance();
      this.auth2.signOut().then(function() {
        console.log("User signed out");
      });
      //this.attachSignout(document.getElementById('googleBtn2'));
    });
  }

  installScript(){
    this.dynamicScriptLoader.load('platform')
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '104742513131-r6pnjt53en8akmt4pqt9d3i5ia5iln8a.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        var socialUser = {
          last_name:profile.getName().split(' ')[1],
          email:profile.getEmail(),
          first_name:profile.getName().split(' ')[0],
          user_category:'User',
          authentication_type:'G',
          // password:googleUser.getAuthResponse().id_token
        };
        console.log('signing in with :: '+JSON.stringify(socialUser))
        this.authService.login(socialUser)
          .subscribe(UserDetails => {
            if(UserDetails){
              this.user = UserDetails;
              alert(`Welcome ${this.user.first_name}`);
              // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
              window.location.href=`${UserDetails.user_category.toLowerCase()}`
            }
            this.loginText = "Login";
          });


      }, (error) => {
        // alert(JSON.stringify(error, undefined, 2));
      });
  }

}
