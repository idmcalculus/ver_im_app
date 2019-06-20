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
          if(authCode){
            opener.document.location = "/signin?code="+authCode;
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