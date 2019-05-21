import { Injectable } from '@angular/core';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import {Config as appConfig} from '../../../config/app-config';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { SignUpService } from '../../components/sign-up/sign-up.service';
import { HttpHeaders } from '@angular/common/http';
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
    this.httpService.baseURL = "http://127.0.0.1:8090";
      return this.httpService.getRequest(`linkedin/${auth_code}`).subscribe(resp=>{
        if(resp.access_token){
          console.log('response : '+resp.access_token)
          this.getProfile(resp.access_token)
        }else if(resp.error){
          console.log('issh : '+resp.error)
        }else{
          console.log('uknown error : '+JSON.stringify(resp))
        }
      })
  }

  public getAuthCodeURL(){
    let config = appConfig.linkedin
    let loginUrl = `${config.base_url}/${config.auth_code_path}?response_type=${config.response_type}&client_id=${config.clientid}&redirect_uri=${config.redirect_uri}&state=${config.state}$scope=${config.scope}`
    return loginUrl;    
  }

  private getProfile(accessToken){
    let config = appConfig.linkedin;
    let requestParam = `/v2/me`;
    
    this.httpService.baseURL = `${config.profile_base_url}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      })
    };

    return this.httpService.getRequest(`${requestParam}`,httpOptions)
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