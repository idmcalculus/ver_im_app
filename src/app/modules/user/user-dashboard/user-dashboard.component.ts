import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserDashboard } from 'src/app/shared/models/UserDashboard';
import { UserService } from '../user.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../admin/admin.service';
import { InvestmentService } from '../../investment/investment.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  @Input() public overiddenUser: User;
  allDashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  dashboardInvestment: any = [];
  userActivity: any = [];
  usersInvestments: [Investment];
  pools: Investment[] = [];
  isLoading = true;
  selectedInvestment = -1;
  investmentInfo: Investment = {duration: '0', investment_amount: 0};
  isGraphShown = false;
  lineChartData: any;
  lineChartLabels: any;
  latest_return = 0;
  totalYieldedAmount = 0;


  constructor(private userService: UserService,
             private adminService: AdminService,
             private investmentService: InvestmentService,
              private authService: AppAuthService)

              {}

  ngOnInit() {
    this.authService.currentUser.subscribe(resp => {
        if (resp) {
        this.overiddenUser = resp;
        this.userService.getusersInvestment(resp.email).subscribe(res => {
            if (res && res.success) {
            this.usersInvestments = res.success.Data;
            this.isLoading = false;
            this.selectedInvestment = 0;
            this.showDetails();
            }
          });
        }
    });

    this.adminService.getDashBoardData().subscribe(resp => {
        if (resp && resp.success) {
          this.allDashBoardData = resp.success.Data;
          this.isLoading = false;
          this.userActivity = this.allDashBoardData.fetch_activities.filter((res)=>res.email=== this.overiddenUser.email);
        }
      });

      this.investmentService.getInvestments(false).subscribe(investments => {
        if (investments) {
          this.pools = investments.success.Data;
        }
        this.isLoading = false;
      });

  }

  showDetails() {
    if ( this.selectedInvestment <= (this.usersInvestments.length - 1) ) {
        this.investmentInfo = this.usersInvestments[this.selectedInvestment];
        this.getUserDashBoard();
        this.selectedInvestment++;
        return this.selectedInvestment;
        } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
        this.isLoading = true;
  }
}

  getUserDashBoard() {
    const userEmail = this.overiddenUser.email;
    const investmentId = this.investmentInfo.id;

    this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
      if (resp && resp.success) {
        this.dashBoardData = resp.success.Data;
        this.dashboardInvestment.push(this.dashBoardData);
      } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
      }
      this.showDetails();
    });
  }

  calculateEstimate(returns, inv, expected_return_period) {
    const estimate = (((returns * this.divisorFunc(expected_return_period)) - inv) / inv) * 100;
    return Math.ceil(estimate);
}

  divisorFunc (expected_return_period) {
    if ( expected_return_period === "Weekly") {
        return 48;
    } else if (expected_return_period === "Monthly") {
        return 12;
    }
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
