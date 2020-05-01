import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserDashboard } from 'src/app/shared/models/UserDashboard';
import { UserService } from '../user.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.scss']
})
export class UserDashboardComponent implements OnInit {

  @Input() public overiddenUser: User;
  allDashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  userActivity: any = [];
  usersInvestments: [Investment];
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
              private authService: AppAuthService) { }

  ngOnInit() {
    if (this.overiddenUser) {
      console.log('dashboard data 1 is :: ' + JSON.stringify(this.overiddenUser));
      this.userService.getusersInvestment(this.overiddenUser.email).subscribe(resp => {
        if (resp && resp.success) {
          this.usersInvestments = resp.success.Data;
          if (resp.success.Data !== 0) {
            this.selectedInvestment = 0;
            this.showDetails();
          }
          this.isLoading = false;
        }
      });
    } else {
        this.authService.currentUser.subscribe(resp => {
          console.log('dashboard data 2 is :: ' + JSON.stringify(resp));
          if (resp) {
            this.overiddenUser = resp;
            this.userService.getusersInvestment(resp.email).subscribe(res => {
              if (res && res.success) {
                this.usersInvestments = res.success.Data;
                console.log(this.usersInvestments);

                this.isLoading = false;
                if (res.success.Data !== 0) {
                  this.selectedInvestment = 0;
                  this.showDetails();
                }
              }
            });
          }
        });
    }
    this.adminService.getDashBoardData().subscribe(resp => {
        if (resp && resp.success) {
          this.allDashBoardData = resp.success.Data;
          console.log(this.allDashBoardData);
          this.isLoading = false;
          this.userActivity = this.allDashBoardData.fetch_activities.filter((res)=>res.email=== this.overiddenUser.email);
          console.log(this.userActivity);
          //  let category = this.dashBoardData.fetch_investment_categories_count.filter((res)=>res.category_id===12)
        }
      });



  }

  showDetails() {
    if (this.selectedInvestment >= 0) {
      this.investmentInfo = this.usersInvestments[this.selectedInvestment];
      console.log(this.investmentInfo);
      this.getUserDashBoard();
    } else {
      this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
      console.log(this.investmentInfo);
      this.totalYieldedAmount = 0;
    }

  }

  getUserDashBoard() {
    const userEmail = this.overiddenUser.email;
    const investmentId = this.investmentInfo.id;

    this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
      if (resp && resp.success) {
        this.dashBoardData = resp.success.Data;
        console.log(this.dashBoardData);
        this.manipulateChartData(this.dashBoardData.investment_return);
      } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
        console.log(this.dashBoardData);
        this.lineChartData = null;
        this.totalYieldedAmount = 0;
      }
      this.latest_return = this.dashBoardData.investment_return.length;
    });
  }

  showGraph() {
    if (this.lineChartData) {
      this.isGraphShown = true;
    }

  }

  hideGraph() {
    this.isGraphShown = false;
  }

  manipulateChartData(investment_return: any) {
    this.lineChartData = [];
    this.lineChartLabels = [];
    const cellData1 = {data: [], label: 'Invested Amount'};
    const cellData2 = {data: [], label: 'Balance'};
    const cellData3 = {data: [], label: 'Yielded Amount'};
    let totYieldAmount = 0;

    investment_return.forEach(x => {
      cellData1.data.push(x.investment_amount);
      cellData2.data.push(x.yielded_investment_amount);
      cellData3.data.push(x.yielded_amount);
      totYieldAmount += x.yielded_amount;
      this.lineChartLabels.push(this.formatDate(x.yielded_date.date));

    });
    this.lineChartData.push(cellData1);
    this.lineChartData.push(cellData2);
    this.lineChartData.push(cellData3);

    this.totalYieldedAmount = totYieldAmount;
    // console.log('here i have :: '+JSON.stringify(this.lineChartData))
  }

  formatDate(dateString: string) {
    dateString = dateString.substring(0, 16);
    if (Number(dateString.substring(11, 13)) > 12) {
      dateString = dateString + ' PM';
    } else {
      dateString = dateString + ' AM';
    }
    return dateString;
  }



}
