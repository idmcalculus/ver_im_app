import { Component, OnInit } from '@angular/core';
// import {DatasharerService} from '../../core/datasharer/datasharer.service';
import {UserSession } from 'src/app/shared/models/UserSession';
import {User} from './../../shared/models/user';
import {AuthService} from './../../core/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {InvestmentService} from './../investment/investment.service';
import { Category } from 'src/app/shared/models/Category';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  userSession:UserSession;  
  userProfile:User={email:'',password:'',user_category:'User'};
  currentUserSubscription:Subscription;
  categories:[Category];
  isUser:boolean=true;
  
  constructor(
    private authService:AuthService,
    private router:Router,
    private investmentService:InvestmentService,
    private dynamicScriptLoader:DynamicScriptLoaderService
    ){ 
      this.dynamicScriptLoader.load('p-coded','v-layout','slimscroll','dash','platform','data-table','flat-pickr');
      this.authService.setInProfileView(true);
    }

  ngOnInit(){
     this.authService.validateSession().then(resp=>{
      if(resp.email){
        this.authService.setUser(resp)
        this.userProfile = resp;
        this.isUser=this.userProfile.user_category=='Admin'?false:true;
      }
    })
  }

  ngOnDestroy() {
    
  }

  getCategories(){
    this.investmentService.getCategories().subscribe(categories=>{
      if(categories && categories.success){
        this.categories = categories.success.Data;
      }
    })
  }
}
