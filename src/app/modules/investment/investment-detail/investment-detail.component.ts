import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {InvestmentService} from './../investment.service'
import { Investment } from 'src/app/shared/models/Investment';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-investment-detail',
  templateUrl: './investment-detail.component.html',
  styleUrls: ['./investment-detail.component.css']
})
export class InvestmentDetailComponent implements OnInit {

  isLoading:boolean=true;
  investment:Investment;
  transaction:Transaction={investment_id:0,number_of_pools:0};
  userinfo:User;
  amountPaid:number=0;userEmail:string='';transactionRef:string='';
  currentUserSubscription:Subscription;
  reportData:any;


  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private investmentService:InvestmentService,
    private authService:AuthService
    ) {
      
     }

  ngOnInit() {
    var investmentId = this.activatedRoute.snapshot.params['id'];
    this.getInvestment(investmentId);
  }

  getInvestment(id:string){
    this.investmentService.getInvestment(id).subscribe(investments=>{
      if(investments && investments.success){
        this.investment = investments.success.Data.investment
        // console.log("i got: "+JSON.stringify(this.investment))
        var tday = new Date().getTime;
        this.investment.reference = `${tday}`
        this.amountPaid = (this.investment.investment_amount / this.investment.max_num_of_slots) * 100;
        var randomString = `${String(Math.random()).substring(10)}${String(new Date().getTime()).substring(0,4)}` 
        this.transactionRef = randomString;
        console.log("Random string is: "+this.transactionRef)
      }
      this.isLoading = false;
    })

    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
        this.userinfo = user;
    });
  }

  joinInvestment(){
    this.transaction.investment_id = this.investment.id;
    this.transaction.amount_paid = (this.investment.investment_amount / this.investment.max_num_of_slots) * this.transaction.number_of_pools* 100;
    this.transaction.amount_paid = Number(this.transaction.amount_paid.toFixed(2))
    this.transaction.payment_reference=this.investment.reference;
    this.investmentService.joinInvestment(this.transaction).subscribe(resp=>{
      if(resp && resp.success){
        alert(resp.success.Message);
      }
    })
  }

  paymentCancel(){
    console.log("payment modal closed")
  }

  
  

}
