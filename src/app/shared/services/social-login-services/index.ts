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
      var ert = this.linkedinService.getAuthCodeURL();
      console.log("fin :: "+ert)
      return ert
    }else if(socialplatform=='yahoo'){
      return this.yahooService.getAuthCodeURL();
    }
    
  }

  public extLogin(socialPlatform,authCode){
    if(socialPlatform =='yahoo'){
      this.yahooService.getAccesstoken(authCode).then(resp=>{
        var resp2:any = resp;
        if(resp2.accessToken){
          this.yahooService.getProfile(resp2.accessToken,resp2.uid).then(res=>{
            var resp:any = res;
            this.httpService.baseURL = "https://versabackend.adebiyipaul.com/api";
            if(resp.email){
                this.doSignUp(resp)
            }
          })
        }
      })
    }else if(socialPlatform =='linkedin'){
      this.linkedinService.getAccesstoken(authCode).then(res=>{
        if(res){
          // this.linkedinService.getProfile(res).then(resp=>{
          //   if(resp){
          //     this.doLogin(resp);
          //   }
          // })
        }
      })
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

  private doSignUp(socialUser){
    this.signUpService.register(socialUser)
    .subscribe(UserDetails => {
      if(UserDetails){
        this.authService.login(socialUser)
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