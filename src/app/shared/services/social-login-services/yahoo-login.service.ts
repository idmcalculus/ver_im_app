import { Injectable } from '@angular/core';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import {Config as appConfig} from '../../../config/app-config';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { SignUpService } from '../../components/sign-up/sign-up.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
declare const gapi: any;



@Injectable({ providedIn: 'root' })
export class YahooLoginService {
  public auth2: any;
  messages: string[] = [];

  constructor(
    private authService:AppAuthService,
    private signUpService:SignUpService,
    private httpService:HttpService,
    private toastService:ToastrService
    ){}



  public getAccesstoken(auth_code:String){
    return new Promise((resolve,reject)=>{
      this.httpService.baseURL = appConfig.server_services_base;
      this.httpService.getRequest(`yahoo/${auth_code}`).subscribe(resp=>{
        if(resp.access_token){
          resolve ({'accessToken':resp.access_token,'uid':resp.xoauth_yahoo_guid})
        }else if(resp.error){
          resolve(resp.error)
        }else{
          resolve(resp)
        }
      })
    })
    
  }

  public getAuthCodeURL(){
    // let config = appConfig.yahoo
    // let loginUrl = `${config.base_url}/${config.auth_code_path}?client_id=${config.clientid}&redirect_uri=${config.redirect_uri}&response_type=code&language=en-us`
    // return loginUrl;  
    return `https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9eHNIendLV2NJU2gwJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTg5&redirect_uri=${appConfig.yahoo.redirect_uri}&response_type=code&language=en-us`;  
  }

  public getProfile(auth_code){
    return new Promise((resolve,reject)=>{
      this.httpService.baseURL = appConfig.server_services_base;
      this.getAccesstoken(auth_code).then(res=>{
        var resp:any = res;
        if(resp && typeof(resp)=='object' ){
          this.httpService.getRequest(`yahoo/getprofile/${resp.accessToken}/${resp.uid}`).subscribe(resp=>{
            if(resp.profile){
              var vll = resp.profile;
              var socialUser = {
                last_name:vll.givenName,
                email:vll.emails[0].handle,
                first_name:vll.familyName,
                user_category:'User',
                authentication_type:'Y'
              };
              
              // console.log("final json :: "+JSON.stringify(socialUser))
              resolve(socialUser);
            }
          })
        }else{
          this.toastService.error(resp);
        }
      })
    })
  }



  public signOut(){

  }

}