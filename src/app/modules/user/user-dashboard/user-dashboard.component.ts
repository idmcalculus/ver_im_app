import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../admin/admin.service';
import { InvestmentService } from '../../investment/investment.service';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { InvestmentGroup } from 'src/app/shared/models/InvestmentGroup';

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
  pools: any = [];
  poolGroup: Investment[] = [];
  filteredYearData: Investment[] = [];
  filteredDayData: Investment[] = [];
  filteredMonthData: Investment[] = [];
  isLoading = true;
  group_name: InvestmentGroup = {group_name: 'Best Selling Investments'};
  selectedInvestment = -1;
  investmentInfo: Investment = {duration: '0', investment_amount: 0};
  isGraphShown = false;
  lineChartData: any;
  lineChartLabels: any;
  latest_return = 0;
  totalYieldedAmount = 0;
  expectedPeriod: '';
  expectedTitle: '';


  constructor(private userService: UserService,
             private adminService: AdminService,
             private investmentService: InvestmentService,
              private authService: AppAuthService)

              {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.currentUser.subscribe(resp => {
        if (resp) {
        this.overiddenUser = resp;
        this.userService.getusersInvestment(resp.email).subscribe(res => {
            if (res && res.success) {
            this.usersInvestments = res.success.Data;
            console.log(this.usersInvestments);
            this.selectedInvestment = 0;

            this.showDetails();
            } else {
                this.isLoading = false;
            }
          });
        }
    });

    this.adminService.getDashBoardData().subscribe(resp => {
        if (resp && resp.success) {
          this.allDashBoardData = resp.success.Data;
          this.userActivity = this.allDashBoardData.fetch_activities.filter((res)=>res.email=== this.overiddenUser.email);
        }
      });

     this.investmentService.getInvestments(false).subscribe(investments => {
        if (investments) {
          this.pools = investments.success.Data;
        }
     });

    this.investmentService.getInvestmentGroup(this.group_name).subscribe(groups => {
      if (groups && groups.success) {
        this.poolGroup = groups.success.Data;
        console.log(this.poolGroup );

        const seventhDay = new Date();
        seventhDay.setDate(seventhDay.getDate() - 7);
        this.filteredDayData = this.poolGroup.filter((d) => {
        return new Date(d.created_at).getTime() >= seventhDay.getTime();
        });
        console.log(this.filteredDayData);

        const Month = new Date();
        Month.setDate(Month.getDate() - 31);
        this.filteredMonthData = this.poolGroup.filter((d) => {
        return new Date(d.created_at).getTime() >= Month.getTime();
        });
        console.log(this.filteredMonthData);

        const Year = new Date();
        Year.setDate(Year.getDate() - 365);
        this.filteredYearData = this.poolGroup.filter((d) => {
        return new Date(d.created_at).getTime() >= Year.getTime();
        });
        console.log(this.filteredYearData);

      }else {
          console.log('No groups yet');
      }
    });
  }

  showDetails() {
    this.isLoading = false;
    if ( this.selectedInvestment <= this.usersInvestments.length ) {
        this.investmentInfo = this.usersInvestments[this.selectedInvestment];
        //const total:any = this.investmentInfo?.expected_return_amount * dashboardInvestment[i].investment_report.length
        this.getUserDashBoard();
        this.selectedInvestment++;
        return this.selectedInvestment;
        } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
        this.isLoading = false;
        }
    }

  getUserDashBoard() {
    const userEmail = this.overiddenUser.email;
    const investmentId = this.investmentInfo.id;

    this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
        if (resp && resp.success) {
          this.dashBoardData = resp.success.Data;
          this.expectedPeriod = this.dashBoardData.investment[0].expected_return_period;
          this.expectedTitle = this.dashBoardData.investment[0].title;

          this.dashBoardData.investment_return.forEach(element => {
              element.expected_return_period = 'Weekly' ;
              element.title =  'Transport Investment';
          });
          this.dashboardInvestment.push(this.dashBoardData);

        } else {
          this.dashBoardData = {number_of_pools: 0,investment: [], investment_return: [], investment_report: []};
        }
        this.showDetails();
    });
  }

  calculateEstimate(returns, inv, expected_return_period,number_of_pools) {
    const estimate = ((returns * this.divisorFunc(expected_return_period)) / (inv * number_of_pools)) * 100;
    return Math.ceil(estimate);
}

  calculateGroupEstimate(returns, inv, expected_return_period) {
    const estimate = ((returns * this.divisorFunc(expected_return_period)) / inv) * 100;
    return Math.ceil(estimate);
}

  divisorFunc (expected_return_period) {
    if ( expected_return_period === "Weekly") {
        return 48;
    } else if (expected_return_period === "Monthly") {
        return 12;
    }
}

 calculateReturn (expected_return_amount, expected_return_period) {
    if ( expected_return_period === "Monthly") {
        return expected_return_amount;
    } else   {
        return expected_return_amount*4;
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

  getTimeAgo(time){
    TimeAgo.addLocale(en);
    var date = new Date(time);
    var hours = date.getHours();

    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(date);
  }



}
