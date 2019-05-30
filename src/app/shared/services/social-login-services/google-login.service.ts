// import { Injectable } from '@angular/core';
// import { AppAuthService } from 'src/app/core/auth/auth.service';
// import {Config as appConfig} from '../../../config/app-config';
// import { HttpService } from 'src/app/core/http/httpservice.service';

// import { HttpParams,HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { SignUpService } from '../../components/sign-up/sign-up.service';
// import { ToastrService } from 'ngx-toastr';
// declare const gapi: any;



// @Injectable({ providedIn: 'root' })
// export class GoogleLoginService {
//   public auth2: any;
//   messages: string[] = [];

//   constructor(
//     private authService:AppAuthService,
//     private signUpService:SignUpService,
//     private httpService:HttpService,
//     private toastrService:ToastrService
//     ){}

//   add(message: string) {
//     this.messages.push(message);
//   }

//   clear() {
//     this.messages = [];
//   }

//   public googleInit() {
//     gapi.load('auth2', () => {
//       this.auth2 = gapi.auth2.init({
//         client_id: '104742513131-r6pnjt53en8akmt4pqt9d3i5ia5iln8a.apps.googleusercontent.com',
//         cookiepolicy: 'single_host_origin',
//         scope: 'profile email'
//       });
//       this.attachSignin(document.getElementById('googleBtn'));
//     });
//   }

//   public attachSignin(element) {
//     this.auth2.attachClickHandler(element, {},
//       (googleUser) => {

//         let profile = googleUser.getBasicProfile();
//         var socialUser = {
//           last_name:profile.getName().split(' ')[1],
//           email:profile.getEmail(),
//           first_name:profile.getName().split(' ')[0],
//           user_category:'User',
//           authentication_type:'G',
//           // password:googleUser.getAuthResponse().id_token
//         };
//         console.log('signing in with :: '+JSON.stringify(socialUser))
//         this.doLogin(socialUser);


//       }, (error) => {
//         // alert(JSON.stringify(error, undefined, 2));
//       });
//   }

//   public signOut() {
//     gapi.load('auth2', () => {
//       this.auth2 = gapi.auth2.getAuthInstance();
//       this.auth2.signOut().then(function() {
//         console.log("User signed out");
//       });
//       //this.attachSignout(document.getElementById('googleBtn2'));
//     });
//   }

//   public yahooLogin(auth_code:String){
//     // return new Observable<any>(observable=>{
//       this.httpService.baseURL = appConfig.yahoo.base_url;
//       const data = new HttpParams()
//         .set('grant_type', 'authorization_code')
//         .set('redirect_uri', appConfig.yahoo.redirect_uri)
//         .set('code', `${auth_code}`) 
//         .set('client_id', appConfig.yahoo.clientid) 
//         .set('client_secret', appConfig.yahoo.secretkey) 
      

//       const httpOptions = {
//         headers: new HttpHeaders({
//           'Content-Type':  'application/x-www-form-urlencoded'
//         })
//       };

//       return this.httpService.postRequest(`${appConfig.yahoo.access_token_path}`,data,httpOptions)
//       .subscribe(resp=>{
//           if(resp){
//               console.log("resp is :: "+JSON.stringify(resp))
//               if(resp && resp.access_token){
//                   //get profile info
//               }

//               this.httpService.baseURL = "https://versabackend.adebiyipaul.com/api";
//               // observable.next(resp.secure_url);

//           }
//       })
//     // })
//   }

//   public linkedinLogin(){

//   }

//   public getSocialUrlLogin(socialplatform){
//     if(socialplatform=='linkedin'){
//       let config = appConfig.linkedin
//       let loginUrl = `${config.base_url}/${config.auth_code_path}
//       ?response_type=${config.response_type}&client_id=${config.clientid}
//       &redirect_uri=${config.redirect_uri}&state=${config.state}&scope=${config.scope}`
//       return loginUrl;
//     }else if(socialplatform=='yahoo'){
//       let config = appConfig.yahoo
//       // let loginUrl = `${config.clientid}/${config.path}
//       // ?response_type=${config.response_type}&client_id=${config.clientid}
//       // &redirect_uri=${config.redirect_uri}&state=${config.state}&scope=${config.scope}`
//       // return loginUrl;
//     }
    
//   }

//   public getAccesstoken(authCode){
//     let config = appConfig.linkedin;
//     let requestParam = `${config.access_token_path}
//     ?grant_type=${config.grant_type}&code=${authCode}&redirect_uri=${config.redirect_uri}
//     &client_id=${config.clientid}`;


//     return new Observable<any>(observable=>{
//       this.httpService.baseURL = `${config.base_url}`;
//       this.httpService.postRequest(`${requestParam}`,{},null)
//       .subscribe(resp=>{
//           if(resp){
//               this.httpService.baseURL = "https://versabackend.adebiyipaul.com/api";
//               observable.next(resp);
//           }
//       })
//     })
//   }

//   public getProfileInfo(accessToken){
//     let config = appConfig.linkedin;
//     let requestParam = `${config.profile_email}`;


//     return new Observable<any>(observable=>{
//       this.httpService.baseURL = `${config.base_url}`;
//       this.httpService.postRequest(`${requestParam}`,{},null)
//       .subscribe(resp=>{
//           if(resp){
//               this.httpService.baseURL = "https://versabackend.adebiyipaul.com/api";
//               observable.next(resp);
//           }
//       })
//     })
//   }

// public socialLogin(socialPlatform){
//   if(socialPlatform=="linkedin"){
//     let authCode = localStorage.getItem("authCode")
//     this.getAccesstoken(authCode).subscribe(resp=>{
//         this.getProfileInfo(resp.accessToken).subscribe(resp1=>{
//           var socialUser = {
//             // last_name:profile.getName().split(' ')[1],
//             email:resp1.getEmail(),
//             // first_name:resp1.getName().split(' ')[0],
//             // user_category:'User',
//             authentication_type:'G',
//             // password:googleUser.getAuthResponse().id_token
//           };

//           this.doLogin(socialUser);
//         })
//     })
//   }
// }


// private doLogin(socialUser){
//   this.authService.login(socialUser)
//   .subscribe(UserDetails => {
//     if(UserDetails){
//     //   alert(`Welcome ${UserDetails.first_name}`);
//       this.toastrService.success(`Welcome ${UserDetails.first_name}`)
//       // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
//       window.location.href=`${UserDetails.user_category.toLowerCase()}`
//     }
//     // this.loginText = "Login";
//   });
// }

// private doSignUp(socialUser){
//   this.signUpService.register(socialUser)
//   .subscribe(UserDetails => {
//     if(UserDetails){
//       this.authService.login(socialUser)
//       .subscribe(UserDetails => {
//         if(UserDetails){
//         //   alert(`Welcome ${UserDetails.first_name}`);
          
//             this.toastrService.success(`Welcome ${UserDetails.first_name}`)
//           window.location.href=`${UserDetails.user_category.toLowerCase()}`
//         }
//       });
//     }
//   });
// }

// }