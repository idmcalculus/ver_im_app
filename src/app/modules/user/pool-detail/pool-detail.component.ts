import { ViewChild,ElementRef,Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute,Router} from '@angular/router';
import {InvestmentService} from './../../investment/investment.service'
import { Report } from 'src/app/shared/models/Report';
import { ReportService } from 'src/app/shared/components/report/report.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.css']
})
export class PoolDetailComponent implements OnInit {
pool:Investment
poolId:number=0;
reportData:Report = {title:'',description:''}
categories=[];
modaltitle:string='Update Plan';
modalButtonTitle:string='';
modalData:Report={};
callBack:any;
isLoaded:boolean;


@ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private investmentService:InvestmentService,
    private reportService:ReportService,
    private authService:AuthService
    ) { 
      this.poolId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.fetchPool(id);
    this.isLoaded = true;
  }

  fetchPool(poolId:string){
    this.investmentService.getInvestment(poolId).subscribe(poolDetails=>{
      if(poolDetails && poolDetails.success){
        if(poolDetails.success.Data){
          this.pool = poolDetails.success.Data;
        }else{
          this.router.navigate(['./', {}]);
        }
      }else{
        
      }
    })
  }

  addReport(filledReport:Report){
    this.reportData = filledReport;
    if(this.reportData.title){
      if(!this.reportData.returned_amount){
        this.reportData.returned_amount=0;
        this.reportData.payment_type = 'Debit';
      }
      this.reportService.createReport(this.reportData).subscribe(resp=>{
          if(resp && resp.success){
            alert(resp.success.Message)
            window.location.href = 'admin/pools/'+this.poolId;    
            // this.closeBtn.nativeElement.click();
          }
      })
    }
  }

 

  updateReport(filledReport:Report){      
      this.reportData = filledReport;
      if(this.reportData.title){
        if(!this.reportData.returned_amount){
          this.reportData.returned_amount=0;
          this.reportData.payment_type = 'Debit';
        }
        this.reportService.updateReport(this.reportData).subscribe(resp=>{
            if(resp && resp.success){
              alert(resp.success.Message)
              window.location.href = 'admin/pools/'+this.poolId;    
              // this.closeBtn.nativeElement.click();
            }
        })
      }
  }

  deleteReport(report){
    var proceed = confirm("Confirm Deltion?")
    if(proceed){
      alert('deleting record :: '+report.id)
      this.reportService.deleteReport(report).subscribe(resp=>{
          if(resp && resp.success){
            alert(resp.success.Message)
            window.location.href = 'admin/pools/'+this.poolId;    
            // this.closeBtn.nativeElement.click();
          }
      })
    }
  }

  manageReport(operation,modalData){
    if(operation=='create'){
      this.modalData = {investment_id:this.poolId}
      this.modaltitle = 'Create Report';
      this.modalButtonTitle = 'Create';
      this.callBack = this.addReport;
    }else if(operation=='update'){
      this.modalData = modalData
      this.modaltitle = 'Update Report';
      this.modalButtonTitle = 'Update';
      this.callBack = this.updateReport;
    }
    
  }

  setPlanOperation(investment){
    this.authService.setCurrentPlanOperation(investment);
  }

  addInvestmnet(){

  }

}
