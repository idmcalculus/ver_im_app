import { Injectable } from '@angular/core';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import {environment as appConfig} from '../../../../environments/environment';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { SignUpService } from '../../components/sign-up/sign-up.service';
import { HttpHeaders, } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
declare const gapi: any;



@Injectable({ providedIn: 'root' })
export class LinkedinLoginService {
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
      return this.httpService.getRequest(`linkedin/${auth_code}`).subscribe(resp=>{
        if(resp.access_token){
          resolve ({'accessToken':resp.access_token})
        }else if(resp.error){
          resolve(resp.error);
        }else{
          resolve(resp);
        }
      })
    })
    
  }

    

  public getAuthCodeURL(){   
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${appConfig.linkedin.clientid}&redirect_uri=${appConfig.linkedin.redirect_uri}&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
  }





  public getProfile(auth_code){
    return new Promise((resolve,reject)=>{
      this.httpService.baseURL = appConfig.server_services_base;
      this.getAccesstoken(auth_code).then(resp=>{
        var token :any=resp;
        if(token && typeof(token)=='object' && !token.error && token.accessToken){
          this.httpService.getRequest(`linkedin/getprofile/${token.accessToken}`).subscribe(resp=>{
            if(resp.profile && resp.email){
              var profileObj = JSON.parse(resp.profile)
              var emailObj = JSON.parse(resp.email)
              var socialUser = {
                last_name:profileObj.localizedLastName,
                email:emailObj.elements[0]['handle~'].emailAddress,
                first_name:profileObj.firstName.localized.en_US,
                user_category:'User',
                authentication_type:'L'
              };
              resolve(socialUser);
            }
          })
        }else{
          this.toastService.error(JSON.stringify(token));
          reject(JSON.stringify(token))
        }
      })
    })
  }



  public signOut(){

  }

}