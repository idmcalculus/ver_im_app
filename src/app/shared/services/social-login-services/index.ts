import { Injectable } from '@angular/core';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { SignUpService } from '../../components/sign-up/sign-up.service';
import { ToastrService } from 'ngx-toastr';
import { YahooLoginService } from './yahoo-login.service';
import { LinkedinLoginService } from './linkedin-login.service';

declare const gapi: any;



@Injectable({ providedIn: 'root' })
export class SocialLogin {
  public auth2: any;
  messages: string[] = [];

  constructor(
    private authService:AppAuthService,
    private signUpService:SignUpService,
    private httpService:HttpService,
    private toastrService:ToastrService,
    private yahooService:YahooLoginService,
    private linkedinService:LinkedinLoginService

    ){}

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
        this.doLogin(socialUser);


      }, (error) => {
        // alert(JSON.stringify(error, undefined, 2));
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



  public getSocialUrlLogin(socialplatform){
    if(socialplatform=='linkedin'){
      return this.linkedinService.getAuthCodeURL()
    }else if(socialplatform=='yahoo'){
      return this.yahooService.getAuthCodeURL();
    }
    
  }

  public extLogin(socialPlatform,authCode){
    if(socialPlatform =='yahoo'){
      this.yahooService.getAccesstoken(authCode)
    }else if(socialPlatform =='linkedin'){
      this.linkedinService.getAccesstoken(authCode)
    }
  }
  public extSignOut(){
    
  }


  private doLogin(socialUser){
    this.authService.login(socialUser)
    .subscribe(UserDetails => {
      if(UserDetails){
        alert(`Welcome ${UserDetails.first_name}`);
        this.toastrService.success(`Welcome ${UserDetails.first_name}`)
        // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
        window.location.href=`${UserDetails.user_category.toLowerCase()}`
      }
      // this.loginText = "Login";
    });
  }


}