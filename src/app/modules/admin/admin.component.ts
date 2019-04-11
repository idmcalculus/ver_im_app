import { Component, OnInit } from '@angular/core';
// import {DatasharerService} from '../../core/datasharer/datasharer.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import {Router} from '@angular/router';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from '../investment/investment.service';
import { AdminService } from './admin.service';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
 user:User={email:'',password:'',user_category:'Admin'};
 investment:Investment;
 investments:[Investment];
 categories:[];

  constructor(
    private authService:AuthService,
    private router:Router,
    private investmentService:InvestmentService
    ) { 
      this.authService.setInProfileView(true);
  }

  ngOnInit() {
    this.authService.validateSession().then(resp=>{
      // console.log("has in :: "+JSON.stringify(resp))
      if(resp && resp.email){
        this.user = resp;
        this.getCategories();
      }
    })
  }

  addInvestmnet(filledInvestment:Investment){
    this.investment = filledInvestment;
    if(this.investment.title){
      console.log("investment to add is :: "+JSON.stringify(this.investment))
      this.investment.expected_return_amount = (this.investment.investment_amount / this.investment.max_num_of_slots).toFixed(2)
      this.investmentService.addInvestment(this.investment).subscribe(resp=>{
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

}
