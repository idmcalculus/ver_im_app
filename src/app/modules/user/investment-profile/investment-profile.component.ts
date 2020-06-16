import { Component, OnInit, Input } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute } from '@angular/router';
import { InvestmentService } from './../../investment/investment.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Report } from 'src/app/shared/models/Report';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/shared/components/report/report.service';



@Component({
  selector: 'app-investment-profile',
  templateUrl: './investment-profile.component.html',
  styleUrls: ['./investment-profile.component.scss']
})
export class InvestmentProfileComponent implements OnInit {
  @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  @Input() public report: Report = {user_id: '', investment_id: 0, title: '', description: '', returned_amount: 0, payment_type: '', id: 0};

  userEmail: string;
  pool;
  poolId = 0;
  isLoading = true;
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
  latestReport: Report = {title: '', returned_amount: 0, investment_id: 0, payment_type: '', description: ''};
  reportId = 0;
  returnedAmount: number;
  user_id: string;
  title: string;
  investmentId: number;
  paymentType: string;
  description: string;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private investmentService: InvestmentService,
              private authService: AppAuthService,
              private reportService: ReportService,
              private toastrService: ToastrService) {
              }
  ngOnInit() {
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
      });
     this.isLoading = true;
      this.investmentService.getInvestment(String(this.poolId)).subscribe(poolDetails => {
        if (poolDetails && poolDetails.success) {
            this.pool = poolDetails.success.Data;
            this.numOfReports = this.pool.report.length;
            this.numOfReports === 0 ?
            (this.latestReport = {
              title: '',
              returned_amount: 0,
              investment_id: 0,
              payment_type: '',
              description: ''
            })
            : this.latestReport = this.pool.report[0];

            this.isLoading = false;
        }
      });
     }



  payInvestors(report: Report, payDate) {
   // const oldDate = Date.parse(String(this.latestReport.created_at));
    const reportDate = new Date();
    const checkDate = Date.parse(String(reportDate));
    console.log(checkDate);
    console.log(payDate);

    if (checkDate >= payDate){
    this.isLoading = true;
    report.title = this.pool.investment.title;
    report.returned_amount = Number(this.pool.investment.expected_return_amount);
    report.investment_id = this.pool.investment.id;
    report.payment_type = 'Credit';
    report.description = `Return on Investment Week ${this.numOfReports + 1}`;

    const data = {
      title: report.title,
      description: report.description,
      returned_amount: report.returned_amount,
      investment_id: report.investment_id,
      payment_type: report.payment_type,
    }; 

    this.reportService.createReport(data).subscribe(resp => {
      if (resp && resp.success) {
        this.toastrService.success('Investors were paid successfully');
        this.isLoading = false;
      }
      this.location.back();
    }); 
  }
  }


  addMonth(date: Date) {
    const newDate = new Date(date);
    const d = newDate.getDate();
    const m = newDate.getMonth();
    return this.pool.investment.expected_return_period === 'Monthly' ? (
      newDate.setMonth(m + 1),
      newDate.getMonth() === 11 ? newDate.setDate(0) : newDate
    ) : (
      newDate.setDate(d + 7)
    );
  }

  goBack() {
    this.location.back();
  }

}
