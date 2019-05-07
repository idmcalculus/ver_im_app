import { Component, OnInit } from '@angular/core';
import {AppAuthService} from './../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private authService: AppAuthService
    ) {
        this.authService.setInProfileView(false);
        this.route.queryParams.subscribe(resp=>{
          var authCode = resp.code;
          if(authCode){
            localStorage.setItem('authCode', authCode);
            if(opener){
              
              alert(localStorage.getItem('authCode'))
              opener.socialAuth();
            }
            
          }
          
        })
   }




}