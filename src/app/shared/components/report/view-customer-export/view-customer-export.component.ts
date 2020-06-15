import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { User } from 'src/app/shared/models/user';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-view-customers-export',
  templateUrl: './view-customer-export.component.html',
  styleUrls: ['./view-customer-export.component.scss']
})
export class exportUserPoolComponent implements OnInit {
    _shown = true;
    pools: Investment[] = [];
    user: any;
    email: any;
    investments: Investment;
    users: User[];
    investment_id: string;
    dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
    userInvestment: Investment[];
    FilteredInvestment: Investment[];
    dashboardInvestment: any = [];
    alluserInvestment: any = [];
    isLoading: boolean;
    selectedInvestment = -1;
    investmentInfo: Investment = {duration: '0', investment_amount: 0};
    poolId: any;
    numOfPool: any=[];
    p = 1;
    p2 = 1;
    pageValue = 5;

    constructor(
      private route: ActivatedRoute,
      private investmentService: InvestmentService,
      private userService: UserService,
      private reportService: ReportService,
      private location: Location
      ) {
        this.email = this.route.snapshot.paramMap.get('email'); // Snapshot param
        this.isLoading = true;
        this.userService.getProfileDetails(this.email).subscribe(userx => {
          if (userx && userx.success) {
            this.user = userx.success.Data;
            this.isLoading = false;
          }
        });
      }
    ngOnInit() {
      this.isLoading = true;
      this.investmentService.getUserInvestments(this.email).subscribe(investments => {
        if (investments && investments.success) {
          this.investment_id = this.route.snapshot.paramMap.get('id');
          const poolId = Number(this.investment_id);
          const data = investments.success;
          this.userInvestment = data.Data.filter(i => i.id === poolId);
          this.numOfPool = data.Inv.filter(i => i.investment_id === poolId);
          this.selectedInvestment = 0;
          this.showDetails();
          this.isLoading = false;
        }
      });
    }

    getPools() {
      this.isLoading = true;
      this.investmentService.getInvestments(false).subscribe(investments => {
        if (investments) {
          this.pools = investments.success.Data;
        }
        this.isLoading = false;
      });
    }

    showDetails() {
      if ( this.selectedInvestment <= (this.userInvestment.length - 1)) {
          this.investmentInfo = this.userInvestment[this.selectedInvestment];
          this.getUserDashBoard();
          this.selectedInvestment++;
          return this.selectedInvestment;
          } else {
          this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
          }
    }

    getUserDashBoard() {
      const userEmail = this.email;
      const investmentId = this.investmentInfo.id;

      this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
        if (resp && resp.success) {
          this.dashBoardData = resp.success.Data;
          this.dashboardInvestment.push(this.dashBoardData);
          this.dashboardInvestment.forEach(investment => {
            investment.investment_report.forEach((report, i) => report.index = i + 1);
          });
          // console.log(this.dashboardInvestment);

        } else {
          this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
        }
        this.showDetails();
      });
    }

    divisorFunc(expected_return_period) {
      if ( expected_return_period === 'Weekly') {
          return 48;
      } else if (expected_return_period === 'Monthly') {
          return 12;
      }
    }

    calculateReturn(numOfPools, price, percentProfit) {
      const roi = percentProfit / 100;
      const profit = numOfPools * price * roi;
      const invAmount = numOfPools * price;
      const totalReturn = profit + invAmount;
      return totalReturn;
    }

    setItemsPerPage(event) {
      this.pageValue = event;
    }

    Back() {
        this.location.back();
    }

    saveAsCSV() {
        if (this.dashboardInvestment.length > 0) {
          const items = [];
          let i = 1;
          let y = 0;
          this.dashboardInvestment[0].investment_return.forEach(line => {
            const csvLine = {
              title: this.dashboardInvestment[0].investment[0].title,
              expected_return_period: this.dashboardInvestment[0].investment[0].expected_return_period,
              investment_amount: line.yielded_amount,
              yeild_amount: line.yielded_amount * i,
              balance: (this.divisorFunc(this.dashboardInvestment[0].investment[0].expected_return_period) * line.yielded_amount) - (line.yielded_amount * i),
              status: this.dashboardInvestment[0].investment[0].is_investment_started === 1 ? 'On-going' : 'Not Yet Started' ,
              yield_date: this.dashboardInvestment[0].investment_report[y].created_at
            };
            items.push(csvLine);
            i++;
            y++;
          });

          this.reportService.exportToCsv('viewCustomerExport.csv', items);
        }
    }

  }
