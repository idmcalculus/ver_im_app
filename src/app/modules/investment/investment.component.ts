import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {InvestmentService} from './investment.service';
import { Transaction } from 'src/app/shared/models/Transaction';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html'
})
export class InvestmentComponent implements OnInit {

  investments:any=[];
  categories:[];
  transaction:Transaction;
  constructor(private routes:Router,private investmentService:InvestmentService) {
    this.getCategories();
   }

  ngOnInit() {
    this.getInvestments();
    // this.getCategories();
  }

  viewInvestment(id:string){
    // this.routes.navigate(['product_detail',{'data':productID}]);
  }

  getInvestments(){
    this.investmentService.getInvestments().subscribe(investments=>{
      if(investments){
        this.investments = investments.success.Data
        // console.log("Investment list is: "+JSON.stringify(this.investments))
      }
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
