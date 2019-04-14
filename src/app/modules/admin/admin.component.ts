import { Component, OnInit } from '@angular/core';
// import {DatasharerService} from '../../core/datasharer/datasharer.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import {Router} from '@angular/router';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from '../investment/investment.service';
import { AdminService } from './admin.service';
import { Category } from 'src/app/shared/models/Category';
import { Subscription } from 'rxjs';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  user:User={email:'',password:'',user_category:'Admin'};
  investment:Investment;
  investments:[Investment];
  categories:[];
  modaltitle:string='Create Plan';
  modalButtonTitle:string='';
  modalData:Investment={};
  callBack:any;
  currentPlanOperation:Subscription

  constructor(
    private authService:AuthService,
    private router:Router,
    private investmentService:InvestmentService,
    private cloudinaryService:CloudinaryService,
    private dynamicScriptLoader:DynamicScriptLoaderService
    ) { 
      this.authService.setInProfileView(true);
      this.currentPlanOperation = this.authService.currentManagePlanOperation.subscribe(modal =>{
        this.setPlanModal(modal);
    })

  }

  ngOnInit() {
    this.loadScripts();
    this.authService.validateSession().then(resp=>{
      if(resp && resp.email){
        this.user = resp;
        this.getCategories();
      }
    })
  }

  addInvestmnet(filledInvestment:Investment){
    if(filledInvestment.title){
      this.modalButtonTitle = 'submitting'
      this.cloudinaryService.upload(filledInvestment.investment_image).subscribe(resp=>{
        if(resp){
          filledInvestment.investment_image = resp;
          this.investmentService.addInvestment(filledInvestment).subscribe(resp=>{
            if(resp && resp.success){
              alert(resp.success.Message);    
              window.location.href = 'admin/pools';      
            }
            this.modalButtonTitle = 'Create'
          })
        }
      })
    }
  }

  updateInvestment(filledInvestment:Investment){
    this.investment = filledInvestment;
    if(this.investment.title){
      this.modalButtonTitle = 'submitting'
      // console.log("updating with :: "+JSON.stringify(this.investment))
      this.investmentService.updateInvestment(this.investment).subscribe(resp=>{
        if(resp && resp.success){
          alert(resp.success.Message);
          window.location.href = 'admin/pools';      
        }
        this.modalButtonTitle = 'Update'
      })
    }
  }

  getInvestments(){

  }

  getInvestment(id:number){

  }

  

  getCategories(){
    this.investmentService.getCategories().subscribe(categories=>{
      // console.log("i hvae cat :: "+JSON.stringify(categories))
      if(categories && categories.success){
        this.categories = categories.success.Data;
      }
    })
  }

  setPlanModal(modalData){
    if(modalData){
      this.modaltitle='Update Plan';
      this.modalButtonTitle='Update';
      this.modalData=modalData.investment;
      // console.log("value setting :: "+JSON.stringify(modalData))
      this.callBack=this.updateInvestment;
    }else{
      this.modaltitle='Create Plan';
      this.modalButtonTitle='Create';
      this.modalData={};
      this.callBack=this.addInvestmnet;
    }
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('chartjs',
    'p-coded','v-layout','slimscroll','g-maps',
    'dash','platform','data-table','flat-pickr').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
