import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {InvestmentService} from './investment.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html'
})
export class InvestmentComponent implements OnInit {

  investments:any=[1,2,3,4];
  constructor(private routes:Router,private investmentService:InvestmentService) { }

  ngOnInit() {

  }

  viewInvestment(id:string){
    // this.routes.navigate(['product_detail',{'data':productID}]);
  }

  getInvestments(){
    this.investmentService.getInvestments().subscribe(investments=>{
      if(investments){
        // this.investments = investments.success.Data
        console.log("Investment list is: "+JSON.stringify(this.investments))
      }
    })
  }
}
