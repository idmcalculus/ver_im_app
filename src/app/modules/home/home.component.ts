import { Component, OnInit } from '@angular/core';
import {AppAuthService} from './../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private activatedRoute:ActivatedRoute,
    private authService: AppAuthService
    ) {
        this.activatedRoute.queryParams.subscribe(resp=>{
          var authCode = resp.code;
          var error = resp.error;
          if(authCode){
            var oprType = localStorage.getItem('socialAuthOpr');
            opener.document.location = "/"+oprType+"?code="+authCode;
            window.close();
          }else if(error){
            window.close();
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