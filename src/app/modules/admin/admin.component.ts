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
    private investmentService:InvestmentService
    ) { 
      this.authService.setInProfileView(true);
      this.currentPlanOperation = this.authService.currentManagePlanOperation.subscribe(modal =>{
        this.setPlanModal(modal);
    })

  }

  ngOnInit() {
    this.authService.validateSession().then(resp=>{
      if(resp && resp.email){
        this.user = resp;
        this.getCategories();
      }
    })
  }

  addInvestmnet(filledInvestment:Investment){
    this.investment = filledInvestment;
    if(this.investment.title){
      // this.investment.expected_return_amount = (this.investment.investment_amount / this.investment.max_num_of_slots).toFixed(2)
      this.investmentService.addInvestment(this.investment).subscribe(resp=>{
        if(resp && resp.success){
          alert(resp.success.Message);    
          window.location.href = 'admin/pools';      
        }
      })
    }
    
  }

  updateInvestment(filledInvestment:Investment){
    this.investment = filledInvestment;
    if(this.investment.title){
      this.investment.expected_return_amount = (this.investment.investment_amount / this.investment.max_num_of_slots).toFixed(2)
      // console.log("updaeting with :: "+JSON.stringify(this.investment))
      this.investmentService.updateInvestment(this.investment).subscribe(resp=>{
        if(resp && resp.success){
          alert(resp.success.Message);    
          window.location.href = 'admin/pools';      
        }
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
      this.callBack=this.updateInvestment;
    }else{
      this.modaltitle='Create Plan';
      this.modalButtonTitle='Create';
      this.modalData={};
      this.callBack=this.addInvestmnet;
    }
  }
}
