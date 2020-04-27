import { Component, OnInit, Input } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute, Router} from '@angular/router';
import { InvestmentService } from './../../investment/investment.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import { ReportService } from 'src/app/shared/components/report/report.service';
import { Report } from 'src/app/shared/models/Report';



@Component({
  selector: 'app-investment-profile',
  templateUrl: './investment-profile.component.html',
  styleUrls: ['./investment-profile.component.scss']
})
export class InvestmentProfileComponent implements OnInit {
  @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  @Input() public report: Report = {user_id: '', investment_id: 0, title: '', description: '', returned_amount: 0, payment_type: '', id: 0};
  userEmail: string;
  pool: Investment;
  poolId = 0;
  isLoading = false;
  selectedUser: User;
  loggedInUser: User;
  userSubscription: Subscription;
  dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  p = 1;
  p2 = 1;
  userInvestment: any[] = [];
  FilteredInvestment: Investment[];
  dashboardInvestment: any = [];
  categories = [];
  selectedInvestment = -1;
  investmentInfo: Investment = {duration: '0', investment_amount: 0};

  expected_return: number;
  investment_amount: number;
  period: string;
  returns: string;
  numOfReports: number;
  latestReport: any;
  reportId = 0;
  returnedAmount: number;
  user_id: string;
  title: string;
  investmentId: number;
  paymentType: string;
  description: string;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private investmentService: InvestmentService,
              private authService: AppAuthService,
              private userService: UserService,
              private dynamicScriptLoader: DynamicScriptLoaderService,
              private reportService: ReportService) {
                this.userSubscription = this.authService.currentUser.subscribe(userInfo => {
                  if (userInfo) {
                    this.loggedInUser = userInfo;
                  }
                });

                this.route.params.subscribe(resp => {
                  this.poolId = resp.pool_id;
                  if (!this.poolId) {
                    this.poolId = Number(this.route.snapshot.paramMap.get('id'));
                  }
                  this.fetchPool(String(this.poolId));
                  this.investmentService.getInvestment(String(this.poolId)).subscribe(async poolDetails => {
                    if (poolDetails && poolDetails.success) {
                      if (poolDetails.success.Data) {
                        this.pool = await poolDetails.success.Data;
                        console.log(this.pool);
                        this.userEmail = this.pool.investment_user[0].user_info[0].email;
                        this.getUserDashBoard(this.poolId, this.userEmail);
                      }
                    }
                  });
                });
                this.loadScripts();
               }

  ngOnInit() {
   /* this.investmentService.getUserInvestments(this.user.email).subscribe(investments => {
      if (investments.success.Data !== 0) {
        this.userInvestment = investments.success.Data;
        console.log(this.userInvestment);
        this.selectedInvestment = 0;
        // this.showDetails();
        this.FilteredInvestment = this.userInvestment.filter((investment: Investment) => investment.is_investment_ended === '0');
      } else {
          this.isLoading = true;
      }
  });*/
}

  async fetchPool(poolId: string) {
    this.isLoading = true;
    this.investmentService.getInvestment(poolId).subscribe(async poolDetails => {
      if (poolDetails && poolDetails.success) {
        if (poolDetails.success.Data) {
          this.pool = await poolDetails.success.Data;
          this.isLoading = false;
        } else {
          this.router.navigate(['./', {}]);
        }
      } else {
      }
    });
  }

  /*showDetails() {
    if ( this.selectedInvestment <= (this.userInvestment.length - 1) ) {
        this.investmentInfo = this.userInvestment[this.selectedInvestment];
        //this.getUserDashBoard();
        this.selectedInvestment++;
        return this.selectedInvestment;
        } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
        this.isLoading = true;
        }
  }*/

  getUserDashBoard(investmentId, userEmail) {
    this.isLoading = true;
    this.userService.getUserDashBoard(investmentId, userEmail).subscribe(async resp => {
      if (resp && resp.success) {
        this.dashBoardData = await resp.success.Data;
        console.log(this.dashBoardData);
        this.isLoading = false;
      } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
      }
      this.numOfReports = this.dashBoardData.investment_report.length;
      this.latestReport = this.dashBoardData.investment_report[this.numOfReports - 1];
      // this.showDetails();
    });
  }

  payInvestors(report: Report) {
    this.isLoading = true;
    this.title = this.latestReport.title;
    this.returnedAmount = this.latestReport.returned_amount;
    this.description = `Return on Investment Week ${this.numOfReports + 1}`;
    this.user_id = this.loggedInUser.email;
    this.investmentId = this.latestReport.investment_id;
    this.paymentType = this.latestReport.payment_type;

    const data = {
      title: report.title,
      description: this.description,
      returned_amount: report.returned_amount,
      investment_id: report.investment_id,
      payment_type: report.payment_type,
      report_id: report.id
    };

    this.reportService.updateReport(data).subscribe(resp => {
      if (resp && resp.success) {
        console.log(resp);
      }
      this.isLoading = false;
    });
  }

  addMonth(date: Date, month: number) {
    const newDate = new Date(date);
    const d = newDate.getDate();
    newDate.setMonth(newDate.getMonth() + month);
    if (newDate.getMonth() === 11) {
        newDate.setDate(0);
    }
    return newDate;
}

  goBack() {
    this.location.back();
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('p-coded', 'v-layout',
    'slimscroll', 'dash', 'platform', 'data-table', 'flat-pickr');
}

}
