import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute } from '@angular/router';
import { InvestmentService } from '../../investment/investment.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../user/user.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './userpool-detail.component.html',
  styleUrls: ['./userpool-detail.component.css']
})
export class UserPoolDetailComponent implements OnInit {
  _shown = true;
  pageValue = 5;
  userData: any [];
  user: User = {email: ''};
  pool: any = [];
  noPool: number;
  userInvestment: any = [];
  userPool: Investment;
  poolId = 0;
  investmentInfo: Investment = {duration: '0', investment_amount: 0};
  latest_return = 0;
  totalYieldedAmount = 0;
  categories: any [];
  selectedInvestment = -1;
  dashboardInvestment: any = [];
  dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  callBack: any;
  isLoading = true;
  selectedUser: User;
  loggedInUser: User = {email: ''};
  userSubscription: Subscription;
  p = 1;
  p2 = 1;

  constructor(private route: ActivatedRoute,
              private investmentService: InvestmentService,
              private userService: UserService,
              private authService: AppAuthService,
              private location: Location
    ) {
      this.isLoading = true;
      this.route.params.subscribe(resp => {
        this.poolId = resp.pool_id;
        if (!this.poolId) {
          this.poolId = Number(this.route.snapshot.paramMap.get('id'));
        }
        this.fetchPool(String(this.poolId));
      });
      this.getCategories();
      this.loggedInUser.email = localStorage.getItem('email');
  }

  ngOnInit() {
    this.isLoading = true;
    this.investmentService.getUserInvestments(this.loggedInUser.email).subscribe(investments => {
      if (investments.success.Data !== 0) {
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

  fetchPool(poolId: string) {
    this.isLoading = true;
    this.userSubscription = this.authService.currentUser.subscribe(userInfo => {
      if (userInfo) {
        this.loggedInUser = userInfo;
        this.investmentService.getUserInvestments(this.loggedInUser.email).subscribe(investments => {
          if (investments) {

          const data = investments.success;
          this.noPool = data.Inv.find(x => x.investment_id === Number(this.poolId));
          this.pool =  data.Data.find(x => x.id === Number(this.poolId));
          console.log(this.pool, data);
          this.pool.num_of_pools_taken = this.noPool;
          }
          this.isLoading = false;
        // console.log(this.noPool, '======<>>>>>>');
        });
      }
    });
  }

  getUserDashBoard() {
    const userEmail = this.loggedInUser.email;
    const investmentId = this.poolId;
    this.isLoading = true;
    this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
      if (resp && resp.success) {
        this.dashBoardData = resp.success.Data;
        this.dashboardInvestment.push(this.dashBoardData);
        this.dashboardInvestment.forEach(investment => {
          investment.investment_report.forEach((report, i) => report.index = i + 1);
        });
        this.isLoading = false;
      } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
      }
    });
  }

  divisorFunc(expected_return_period) {
    if ( expected_return_period === 'Weekly') {
        return 48;
    } else if (expected_return_period === 'Monthly') {
        return 12;
    }else if (this.pool.expected_return_period === 'Daily') {
      return Number(this.pool.duration)*30;
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
    if (this.categories && id) {
      const res = this.categories.find( r => r.id === id);
      return res.category_name;
    }
  }

  getPoolStatus(isInvestmentStarted) {
    return isInvestmentStarted === 1 ? 'Active' : 'Inactive';
  }

  viewUserDetail(user) {
    // console.log("gat it :: "+JSON.stringify(user))
    this.selectedUser = user;
  }

  cancelPool() {
    this.location.back();
  }

  calculateamount(returns, inv, period) {
    const estimate = ((returns * this.divisorFunc(period)) / inv) * 100;
    return estimate.toFixed(2);
  }

  calculateReturn(numOfPools, price, percentProfit) {
    const roi = percentProfit / 100;
    const profit = numOfPools * price * roi;
    const invAmount = numOfPools * price;
    const totalReturn = profit + invAmount;
    return totalReturn;
  }

  periodicReturn(period, numOfPools, price, percentProfit) {
    const periodicReturn = period === 'Monthly' ? (
      this.calculateReturn(numOfPools, price, percentProfit) / 12
    ) : (
      this.calculateReturn(numOfPools, price, percentProfit) / 48
    );
    return periodicReturn.toFixed(2);
  }

  setItemsPerPage(event) {
    this.pageValue = event;
  }

  addMonth(date: Date) {
    const newDate = new Date(date);
    const d = newDate.getDate();
    const m = newDate.getMonth();
    if (this.pool) {
      return this.pool.expected_return_period === 'Monthly' ? (
        newDate.setMonth(m + 1),
        newDate.getMonth() === 11 ? newDate.setDate(0) : newDate
      ) : (
        newDate.setDate(d + 7)
      );
    }
  }

}
