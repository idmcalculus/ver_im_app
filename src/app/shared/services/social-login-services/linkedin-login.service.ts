import { Injectable } from '@angular/core';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import {Config as appConfig} from '../../../config/app-config';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { SignUpService } from '../../components/sign-up/sign-up.service';
import { HttpHeaders, } from '@angular/common/http';
declare const gapi: any;



@Injectable({ providedIn: 'root' })
export class LinkedinLoginService {
  public auth2: any;
  messages: string[] = [];

  constructor(
    private authService:AppAuthService,
    private signUpService:SignUpService,
    private httpService:HttpService
    ){}



  public getAccesstoken(auth_code:String){
    return new Promise((resolve,reject)=>{
      this.httpService.baseURL = window.location.host;
      // this.httpService.baseURL = "http://127.0.0.1:8990";
      return this.httpService.getRequest(`linkedin/${auth_code}`).subscribe(resp=>{
        console.log('response res is :: '+JSON.stringify(resp))
        if(resp.access_token){
          resolve(resp.access_token);
        }else if(resp.error){
          resolve(resp.access_token);
        }else{
          resolve(resp);
        }
      })
    })
    
  }

  public getAuthCodeURL(){
    // let config = appConfig.linkedin
    // let loginUrl = `${config.base_url}/${config.auth_code_path}?response_type=${config.response_type}&client_id=${config.clientid}&redirect_uri=${config.redirect_uri}&state=${config.state}$scope=${config.scope}`
    // return loginUrl;    
    return "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77pv3mo63oyixv&redirect_uri=http://127.0.0.1:4200&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social";
  }



  public getProfile(accessToken:String){
    // console.log("using auth code: "+auth_code)
    // this.httpService.baseURL = window.location.host;
    this.httpService.baseURL = "http://127.0.0.1:8990";
    return this.httpService.getRequest(`linkedin/getprofile/${accessToken}`).subscribe(resp=>{
      console.log('profile response : '+JSON.stringify(resp))
    })
  }

  public login(socialUser){
    this.authService.login(socialUser)
    .subscribe(UserDetails => {
      if(UserDetails){
        alert(`Welcome ${UserDetails.first_name}`);
        // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
        window.location.href=`${UserDetails.user_category.toLowerCase()}`
      }
      // this.loginText = "Login";
    });
  }

  public signup(socialUser){
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

  public signOut(){

  }

}