import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute,Router} from '@angular/router';
import {InvestmentService} from './../../investment/investment.service'
import { ReportService } from '../../report/report.service';
import { Report } from 'src/app/shared/models/Report';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.css']
})
export class PoolDetailComponent implements OnInit {
pool:any
reportData:Report = {title:'',description:''}


  constructor(private route:ActivatedRoute,
    private router:Router,
    private investmentService:InvestmentService,
    private reportService:ReportService
    ) { 
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.fetchPool(id);
  }

  fetchPool(poolId:string){
    this.investmentService.getInvestment(poolId).subscribe(poolDetails=>{
      if(poolDetails && poolDetails.success){
        if(poolDetails.success.Data){
          this.pool = poolDetails.success.Data;
          console.log("jssdjshld: "+JSON.stringify(this.pool))
        }else{
          this.router.navigate(['./', {}]);
        }
      }else{
        
      }
    })
  }

  addReport(){
    this.reportData.investment_id = this.pool.investment.id
    var amnt:any = this.reportData.returned_amount;
    // amnt = amnt.toFixed(2);
    this.reportData.returned_amount = Number(amnt);
    console.log("sending :: "+JSON.stringify(this.reportData))
    this.reportService.createReport(this.reportData).subscribe(resp=>{
        if(resp && resp.success){
          console.log("Result of add report :: "+JSON.stringify(resp))
        }
    })
  }

}
