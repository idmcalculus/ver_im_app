import { Injectable } from '@angular/core';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import {Config as appConfig} from '../../../config/app-config';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { SignUpService } from '../../components/sign-up/sign-up.service';
import { Observable } from 'rxjs';
declare const gapi: any;



@Injectable({ providedIn: 'root' })
export class YahooLoginService {
  public auth2: any;
  messages: string[] = [];

  constructor(
    private authService:AppAuthService,
    private signUpService:SignUpService,
    private httpService:HttpService
    ){}



  public getAccesstoken(auth_code:String){
    // this.httpService.baseURL = window.location.host;
    return new Observable((result:any)=>{
      // this.httpService.baseURL = "http://127.0.0.1:8990";
      this.httpService.baseURL = window.location.host;
      return this.httpService.getRequest(`yahoo/${auth_code}`).subscribe(resp=>{
        if(resp.access_token){
          console.log('response : '+resp.access_token)
          return {'accessToken':resp.access_token,'uid':resp.xoauth_yahoo_guid}
        }else if(resp.error){
          console.log('issh : '+resp.error)
          return resp.error
        }else{
          console.log('uknown error : '+JSON.stringify(resp))
          return resp
        }
      })
    })
    
  }

  public getAuthCodeURL(){
    // let config = appConfig.yahoo
    // let loginUrl = `${config.base_url}/${config.auth_code_path}?client_id=${config.clientid}&redirect_uri=${config.redirect_uri}&response_type=code&language=en-us`
    // return loginUrl;  
    return "https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9eHNIendLV2NJU2gwJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTg5&redirect_uri=http://versa-ims.herokuapp.com&response_type=code&language=en-us";  
  }

  public getProfile(accessToken,userId){
    return new Observable((result:any)=>{
      this.httpService.baseURL = "http://127.0.0.1:8990";
      this.httpService.getRequest(`yahoo/getprofile/${accessToken}/${userId}`).subscribe(resp=>{
        console.log('profile response : '+JSON.stringify(resp))
        if(resp.profile){
          var vll = resp.profile;
          var socialUser = {
            last_name:vll.givenName,
            email:vll.emails[0].handle,
            first_name:vll.familyName,
            user_category:'User',
            authentication_type:'G'
          };
          return socialUser;
        }
      })
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