import { Component, OnInit } from '@angular/core';
import {AppAuthService} from './../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialLogin } from '../../shared/services/social-login-services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private authService: AppAuthService,
    private socialAuth:SocialLogin
    ) {
        // this.authService.setInProfileView(false);
        this.route.queryParams.subscribe(resp=>{
          var authCode = resp.code;
          if(authCode){
            // localStorage.setItem('auth_Code', authCode);
            // alert('using :: '+authCode)
            // this.socialAuth.yahooLogin(authCode).subscribe(resp=>{
            //   console.log(JSON.stringify(resp))
            // })
          }
          
        })
   }




}