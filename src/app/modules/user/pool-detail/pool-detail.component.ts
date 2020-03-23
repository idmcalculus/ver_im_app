import { ViewChild,ElementRef,Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute,Router} from '@angular/router';
import {InvestmentService} from './../../investment/investment.service'
import { Report } from 'src/app/shared/models/Report';
import { ReportService } from 'src/app/shared/components/report/report.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.scss']
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
  isLoading:boolean=true;
  selectedUser:User;
  loggedInUser:User;
  userSubscription:Subscription
  // @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private investmentService:InvestmentService,
    private reportService:ReportService,
    private authService:AppAuthService
    ) { 

      this.userSubscription = this.authService.currentUser.subscribe(userInfo =>{
        if(userInfo){
          this.loggedInUser = userInfo;
        }
      })

      this.route.params.subscribe(resp=>{
        this.poolId = resp.pool_id;
        if(!this.poolId){
          this.poolId = Number(this.route.snapshot.paramMap.get('id'));
        }
        this.fetchPool(String(this.poolId));
      })
  }

  ngOnInit() {
    
  }

  fetchPool(poolId:string){
    this.isLoading =true;
    this.investmentService.getInvestment(poolId).subscribe(poolDetails=>{
      if(poolDetails && poolDetails.success){
        if(poolDetails.success.Data){
          this.pool = poolDetails.success.Data;
          // console.log("i have gat :: "+JSON.stringify(this.pool))
          this.isLoading = false;
        }else{
          this.router.navigate(['./', {}]);
        }
      }else{
        
      }
    })
  }

  updatePool(poolId:string){
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
            // alert(resp.success.Message)
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
              // alert(resp.success.Message)
              window.location.href = 'admin/pools/'+this.poolId;    
              // this.closeBtn.nativeElement.click();
            }
        })
      }
  }

  deleteReport(report){
    var proceed = confirm("Confirm Deletion?")
    if(proceed){
      // alert('deleting record :: '+report.id)
      this.reportService.deleteReport(report).subscribe(resp=>{
          if(resp && resp.success){
            // alert(resp.success.Message)
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

  addUser(operation,modalData){
    if(operation=='create'){
      this.modalData = {investment_id:this.poolId}
      this.modaltitle = 'Add User To Pool';
      this.modalButtonTitle = 'Add User';
      this.callBack = this.updatePool;
      this.router.navigateByUrl('admin/adduser');
    }
  }

  setPlanOperation(investment){
    // console.log("setting with :: "+JSON.stringify(investment))
    if(investment && investment.investment){
      if(!investment.investment.show_publicly || investment.investment.show_publicly=='0'){
        investment.investment.show_publicly=false;
      }
    }
    this.authService.setCurrentPlanOperation(investment);
  }

  addInvestmnet(){

  }

  viewUserDetail(user){
    // console.log("gat it :: "+JSON.stringify(user))
    this.selectedUser = user;
  }

  pullOut(){
    var proceed = confirm('Do you really want to pull out from investment?');
    if(proceed){
      this.investmentService.pullOutFromInvestment(String(this.poolId)).subscribe(resp=>{
        if(resp && resp.success){
          // alert(resp.success.Message)
          this.fetchPool(String(this.poolId))
        }
      })
    }
  }

  endInvestment(){
    var proceed = confirm('Do you really want to end this investment?');
    if(proceed){
      this.investmentService.endInvestment(String(this.poolId)).subscribe(resp=>{
        if(resp && resp.success){
          // alert(resp.success.Message)
          this.fetchPool(String(this.poolId))
        }
      })
    }
  }

  startInvestment(){
    var proceed = confirm('Do you really want to start this investment?');
    if(proceed){
      this.investmentService.startInvestment(String(this.poolId)).subscribe(resp=>{
        if(resp && resp.success){
          // alert(resp.success.Message)
          this.fetchPool(String(this.poolId))
        }
      })
    }
  }

  cancelPool() {
    this.router.navigateByUrl('admin/pools');
  }


  calculateEstimate(returns,inv){
    const estimate = (((returns*12) - inv)/inv) * 100;
    return Math.ceil(estimate);
  }

}
