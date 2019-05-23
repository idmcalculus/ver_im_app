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
        this.route.queryParams.subscribe(resp=>{
          var authCode = resp.code;
          if(authCode){
            if(authCode.length > 10){
              this.socialAuth.extLogin('linkedin',authCode)
            }else{
              this.socialAuth.extLogin('yahoo',authCode)
            }
          }
        })
   }


   ngOnInit(){
    this.authService.setInHomeView(true);
    }

    ngOnDestroy(){
      this.authService.setInHomeView(false);
    }


    

}