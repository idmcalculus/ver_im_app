import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {InvestmentService} from './investment.service';
import { Transaction } from 'src/app/shared/models/Transaction';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html'
})
export class InvestmentComponent implements OnInit {

  isLoading:boolean=true;
  investments:any=[];
  categories:[];
  transaction:Transaction;
  constructor(private routes:Router,private investmentService:InvestmentService) {
    this.getCategories();
   }

  ngOnInit() {
    this.getInvestments();
  }

  viewInvestment(id:string){
    // this.routes.navigate(['product_detail',{'data':productID}]);
  }

  getInvestments(){
    this.investmentService.getInvestments().subscribe(investments=>{
      var investmentArray=[];
      if(investments){
        investmentArray = investments.success.Data
        var cnt = 0;
        investmentArray.forEach(element => {
          if(element.is_investment_started=='0'){
            this.investments[cnt] = element;
            cnt++;
          }
        });
      }
      
      this.isLoading = false;
    })
  }

  getCategories(){
    this.investmentService.getCategories().subscribe(categories=>{
      if(categories && categories.success){
        this.categories = categories.success.Data;
      }
    })
  }

  joinInvestment(){
    this.investmentService.joinInvestment(this.transaction).subscribe(tran=>{
      if(tran && tran.success){
        // this.categories = tran.success.Data;
      }
    })
  }

  updateInvestment(){

  }

  pullOutOfInvestment(){

  }
}
