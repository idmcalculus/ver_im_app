import { Injectable } from '@angular/core';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import {Config as appConfig} from '../../../config/app-config';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { SignUpService } from '../../components/sign-up/sign-up.service';
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
    this.httpService.baseURL = "http://127.0.0.1:8090";
      return this.httpService.getRequest(`yahoo/${auth_code}`).subscribe(resp=>{
        if(resp.access_token){
          console.log('response : ')
          this.getProfile(resp.access_token,resp.xoauth_yahoo_guid)
        }else if(resp.error){
          console.log('issh : '+resp.error)
        }else{
          console.log('uknown error : '+JSON.stringify(resp))
        }
      })
  }

  public getAuthCodeURL(){
    let config = appConfig.yahoo
    let loginUrl = `${config.base_url}/${config.auth_code_path}?client_id=${config.clientid}&redirect_uri=${config.redirect_uri}&response_type=code&language=en-us`
    return loginUrl;    
  }

  private getProfile(accessToken,userId){
    let config = appConfig.yahoo;
    let requestParam = `v1/user/${userId}/profile`;
    
    this.httpService.baseURL = `${config.profil_base_url}`;
    return this.httpService.postRequest(`${requestParam}`,{},null)
    .subscribe(resp=>{
      console.log("response :: "+JSON.stringify(resp))
        if(resp){
            this.httpService.baseURL = "https://versabackend.adebiyipaul.com/api";
        }
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