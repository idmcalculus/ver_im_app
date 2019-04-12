import { Component, OnInit } from '@angular/core';
import {InvestmentService} from '../../investment/investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {
  isLoading:boolean=true;
  pools:Investment[]=[];
  pool:Investment;
  userType:string;

  constructor(
    private authService:AuthService,
    private investmentService:InvestmentService) { 
      let userpath = window.location.pathname;
      if(userpath.includes('user')){
        this.userType = 'user';
        this.getUserPols();
      }else{
        this.userType = 'admin';
        this.getPools();
      }
  }

  ngOnInit() {
  }


  getPools(){
    this.investmentService.getInvestments().subscribe(investments=>{
      if(investments){
        this.pools = investments.success.Data
      }
      this.isLoading=false;
    })
  }

  getUserPols(){
    this.investmentService.getUserInvestments().subscribe(investments=>{
      if(investments){
        this.pools = investments.success.Data
      }
      this.isLoading=false;
    })
  }

  setPlanOperation(investment){
    this.authService.setCurrentPlanOperation(investment);
  }

  
}
