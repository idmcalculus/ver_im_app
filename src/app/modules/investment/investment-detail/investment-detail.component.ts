import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {InvestmentService} from './../investment.service'
import { Investment } from 'src/app/shared/models/Investment';

@Component({
  selector: 'app-investment-detail',
  templateUrl: './investment-detail.component.html'
})
export class InvestmentDetailComponent implements OnInit {

  investment:Investment={title:''};

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
      console.log("response is: "+JSON.stringify(investments))
      if(investments && investments.success){
        this.investment = investments.success.Data[0]
      }
    })
  }

}
