import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {InvestmentService} from './../investment.service'
import { Investment } from 'src/app/shared/models/Investment';
import { Transaction } from 'src/app/shared/models/Transaction';

@Component({
  selector: 'app-investment-detail',
  templateUrl: './investment-detail.component.html'
})
export class InvestmentDetailComponent implements OnInit {

  investment:Investment={title:''};
  transaction:Transaction={investment_id:0,number_of_pools:0};

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private investmentService:InvestmentService
    ) {
      var investmentId = this.activatedRoute.snapshot.params['id'];
      this.getInvestment(investmentId);
     }

  ngOnInit() {
    
  }

  getInvestment(id:string){
    this.investmentService.getInvestment(id).subscribe(investments=>{
      if(investments && investments.success){
        this.investment = investments.success.Data[0]
      }
    })
  }

  joinInvestment(){
    this.transaction.investment_id = this.investment.id;
    this.transaction.amount_paid = (this.investment.investment_amount / this.investment.max_num_of_slots) * this.transaction.number_of_pools;
    this.transaction.payment_reference="txn-0012131";
    console.log("Request is: "+JSON.stringify(this.transaction))
    this.investmentService.joinInvestment(this.transaction).subscribe(resp=>{
      if(resp && resp.success){
        alert(resp.success.Message);
        window.location.href = "investments";
      }
    })
  }
  

}
