import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute, Router} from '@angular/router';
import {InvestmentService} from '../../investment/investment.service';
import { ReportService } from 'src/app/shared/components/report/report.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../user/user.service';
import { UserDashboard } from 'src/app/shared/models/UserDashboard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './userpool-detail.component.html',
  styleUrls: ['./userpool-detail.component.css']
})
export class userPoolDetailComponent implements OnInit {
  _shown = true;
  pageValue = 5;
  userData: any [];
  user: User = {email: '',};
  pool:any =[];
  noPool:number;
  userInvestment: any = [];
  userPool: Investment;
  poolId:number=0;
  investmentInfo: Investment = {duration: '0', investment_amount: 0};
  latest_return = 0;
  totalYieldedAmount = 0;
  categories:any [];
  selectedInvestment = -1;
  dashboardInvestment: any = [];
  dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  callBack:any;
  isLoading:boolean=true;
  selectedUser:User;
  loggedInUser:User = {email: '',};
  userSubscription:Subscription;
  p: number = 1;
  p2: number =1;
  // @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private investmentService:InvestmentService,
    private userService: UserService,
    private reportService:ReportService,
    private authService:AppAuthService,
    ) {
      
      this.route.params.subscribe(resp => {
        this.poolId = resp.pool_id;
        if (!this.poolId) {
          this.poolId = Number(this.route.snapshot.paramMap.get('id'));
        }
        this.fetchPool(String(this.poolId));
      });
      
      this.getCategories();
  }

  ngOnInit() {
    this.investmentService.getUserInvestments(this.loggedInUser.email).subscribe(investments=>{
      if(investments.success.Data !== 0){
        this.userInvestment = investments.success.Data;
        this.selectedInvestment = 0;
        this.showDetails();
      }
    this.isLoading = false;
    });
  }

  showDetails() {
    if ( this.selectedInvestment <= (this.userInvestment.length - 1) ) {
        this.investmentInfo = this.userInvestment[this.selectedInvestment];
        this.getUserDashBoard();
        this.selectedInvestment++;
        return this.selectedInvestment;
        } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
        this.isLoading = true;
    }
  }

  fetchPool(poolId: string){
    this.userSubscription = this.authService.currentUser.subscribe(userInfo =>{
      if(userInfo){
        this.loggedInUser = userInfo;
        this.investmentService.getUserInvestments(this.loggedInUser.email).subscribe(investments => {
          if (investments) {

          var data = investments.success
          this.noPool = data.Inv.find(x => x.investment_id == this.poolId);
          this.pool =  data.Data.find(x => x.id == this.poolId);
          this.pool.num_of_pools_taken = this.noPool;
        }
        //console.log(this.noPool, '======<>>>>>>');
        });
      }
    });
  }

  
  getUserDashBoard() {
    //console.log(this.loggedInUser.email);
    const userEmail = this.loggedInUser.email;
    const investmentId = this.poolId;
    
    this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
      if (resp && resp.success) {
        this.dashBoardData = resp.success.Data;
        //console.log(this.dashBoardData);
        this.dashboardInvestment.push(this.dashBoardData);
        this.dashboardInvestment.forEach(investment => {
          investment.investment_report.forEach((report, i) => report.index = i + 1);
        });
        console.log(this.dashboardInvestment, 'hello');
      } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
        
      }
    });
  }

  updatePool(poolId: string) {
    this.investmentService.getInvestment(poolId).subscribe(poolDetails => {
      if (poolDetails && poolDetails.success) {
        if (poolDetails.success.Data) {
          this.pool = poolDetails.success.Data;
        } else {
          this.router.navigate(['./', {}]);
        }
      } else {
      }
    });
  }

  divisorFunc(expected_return_period) {
    if ( expected_return_period === "Weekly") {
        return 48;
    } else if (expected_return_period === "Monthly") {
        return 12;
    }
}

  getCategories() {
    this.isLoading = true;
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
      }
      this.isLoading = false;
    });
  }
  getCategoryName(id) {
    const res = this.categories.find( r => r.id === id);
    return res.category_name;
  }

  getPoolstatus(pool){
    if (pool.is_investment_started == 1) {
      return 'Active';
    } else{
      return 'Inactive';
    }
  }

  viewUserDetail(user) {
    // console.log("gat it :: "+JSON.stringify(user))
    this.selectedUser = user;
  }

  cancelPool() {
    this.router.navigateByUrl('admin/userPools');
  }

  calculateamount(returns, inv, expected_return_period) {
    const estimate = ((returns * this.divisorFunc(expected_return_period)) / inv) * 100;
    return estimate.toFixed(2);
}

  calculateEstimate(pool) {
    const returns = pool.expected_return_amount;
    const dur = pool.expected_return_period === 'Monthly' ? 12 : 48;
    const inv = pool.investment_amount;
    const estimate = (((returns * dur)/inv) * 100);
    return Math.ceil(estimate);
    
  }

  setItemsPerPage(event){
    this.pageValue = event;
  }

  addMonth(date: Date, month: number) {
    const newDate = new Date(date);
    const d = newDate.getDate();
    newDate.setMonth(newDate.getMonth() + month);
    if (newDate.getMonth() == 11) {
        newDate.setDate(0);
    }
    return newDate;
  }

}
