import { Injectable } from '@angular/core';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { SignUpService } from '../../components/sign-up/sign-up.service';
import { ToastrService } from 'ngx-toastr';
import { YahooLoginService } from './yahoo-login.service';
import { LinkedinLoginService } from './linkedin-login.service';
import {Config as appConfig} from '../../../config/app-config'

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
        client_id: appConfig.google.clientid,
        cookiepolicy: appConfig.google.cookiepolicy,
        scope: appConfig.google.scope
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
        // console.log('signing in with :: '+JSON.stringify(socialUser))
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
      var ert = this.linkedinService.getAuthCodeURL();
      return ert
    }else if(socialplatform=='yahoo'){
      return this.yahooService.getAuthCodeURL();
    }
    
  }

  public socialAuth(socialPlatform,authCode,operation){
    if(socialPlatform =='yahoo'){
      this.yahooService.getProfile(authCode).then(resp=>{
        this.httpService.baseURL = appConfig["app-live-url"];
        if(resp){
          if(operation=="login"){
            this.doLogin(resp)
          }else{
            this.doSignUp(resp)
          }
        }
      })
    }else if(socialPlatform =='linkedin'){
      this.linkedinService.getProfile(authCode).then(resp=>{
        this.httpService.baseURL = appConfig["app-live-url"];
        if(resp){
          if(operation=="login"){
            this.doLogin(resp);
          }else{
            this.doSignUp(resp)
          }
        }
      })
    }
  }


  public extSignOut(){
    
  }


  private doLogin(socialUser){
    this.authService.socialLogin(socialUser)
    .subscribe(UserDetails => {
      if(UserDetails){
        alert(`Welcome ${UserDetails.first_name}`);
        this.toastrService.success(`Welcome ${UserDetails.first_name}`)
        // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
        window.location.href=`${UserDetails.user_category.toLowerCase()}`
      }
    });
  }

  private doSignUp(socialUser){
    // console.log("Social signup recieved :: "+JSON.stringify(socialUser))
    this.signUpService.register(socialUser)
    .subscribe(UserDetails => {
      if(UserDetails && UserDetails.success){
        this.authService.socialLogin(socialUser)
        .subscribe(UserDetails => {
          if(UserDetails){
            alert(`Welcome ${UserDetails.first_name}`);
            window.location.href=`${UserDetails.user_category.toLowerCase()}`
          }
        });
      }
    });
  }
  
}