import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute, Router} from '@angular/router';
import {InvestmentService} from '../../investment/investment.service';
import { Report } from 'src/app/shared/models/Report';
import { ReportService } from 'src/app/shared/components/report/report.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../user/user.service';
import { UserDashboard } from 'src/app/shared/models/UserDashboard';
import { Category } from 'src/app/shared/models/Category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './userpool-detail.component.html',
  styleUrls: ['./userpool-detail.component.scss']
})
export class userPoolDetailComponent implements OnInit {
  user: User = {email: '',};
  pool:Investment = {investment_amount: 0, expected_return_amount: '', expected_return_period: ''};
  userInvestment: Investment[];
  poolId:number=0;
  investmentInfo: Investment = {duration: '0', investment_amount: 0};
  latest_return = 0;
  totalYieldedAmount = 0;
  categories=[];
  selectedInvestment = -1;
  dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  callBack:any;
  isLoading:boolean=true;
  selectedUser:User;
  loggedInUser:User = {email: '',};
  userSubscription:Subscription;
  // @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private investmentService:InvestmentService,
    private userService: UserService,
    private reportService:ReportService,
    private authService:AppAuthService,
    ) { 
      this.getCategories();
      this.userSubscription = this.authService.currentUser.subscribe(userInfo =>{
        if(userInfo){
          this.loggedInUser = userInfo;
        }
      });

      this.route.params.subscribe(resp => {
        this.poolId = resp.pool_id;
        if (!this.poolId) {
          this.poolId = Number(this.route.snapshot.paramMap.get('id'));
        }
        this.fetchPool(String(this.poolId));
      });
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
    if (this.selectedInvestment >= 0) {
      console.log(this.userInvestment);
      this.investmentInfo = this.userInvestment[this.selectedInvestment];
      
      this.getUserDashBoard();
    } else {
      this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
      console.log(this.investmentInfo);
      this.totalYieldedAmount = 0;
    }

  }
  
  getUserDashBoard() {
    console.log(this.loggedInUser.email);
    const userEmail = this.loggedInUser.email;
    const investmentId = this.investmentInfo.id;
    
    this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
      if (resp && resp.success) {
        this.dashBoardData = resp.success.Data;
        console.log(this.dashBoardData);
      } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
        console.log(this.dashBoardData);
        this.totalYieldedAmount = 0;
      }
      this.latest_return = this.dashBoardData.investment_return.length;
    });
  }

  fetchPool(poolId: string) {
    this.isLoading = true;
    this.investmentService.getInvestment(poolId).subscribe(poolDetails => {
      if (poolDetails && poolDetails.success) {
        if (poolDetails.success.Data) {
          this.pool = poolDetails.success.Data;
          // console.log("i have gat :: "+JSON.stringify(this.pool))
          this.isLoading = false;
        } else {
          this.router.navigate(['./', {}]);
        }
      } else {
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

  getCategories() {
    this.isLoading = true;
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
      }
      this.isLoading = false;
    });
  }

  getCategoryName(id){
    const res = this.categories.find( r=> r.id == 21);
    return res.category_name;
  }

  viewUserDetail(user) {
    // console.log("gat it :: "+JSON.stringify(user))
    this.selectedUser = user;
  }

  cancelPool() {
    this.router.navigateByUrl('admin/userPools');
  }

}
