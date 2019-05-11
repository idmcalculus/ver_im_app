import { Component, OnInit } from '@angular/core';
import {AppAuthService} from './../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialLoginService } from 'src/app/shared/services/social-login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private authService: AppAuthService,
    private socialAuth:SocialLoginService
    ) {
        this.authService.setInProfileView(false);
        this.route.queryParams.subscribe(resp=>{
          var authCode = resp.code;
          if(authCode){
            // localStorage.setItem('authCode', authCode);
            // if(opener){
              
            // alert(localStorage.getItem('authCode'))
            console.log("auth code :: "+localStorage.getItem('authCode'))
            //   //use authcode to get details and sign in
            //   this.socialAuth.yahooLogin(localStorage.getItem('authCode'));
            //   // opener.socialAuth();
            // }
            this.socialAuth.yahooLogin(authCode);
          }
          
        })
   }




}