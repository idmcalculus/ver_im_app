import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { User } from 'src/app/shared/models/user';
import { Investment } from 'src/app/shared/models/Investment';
import { ReportService } from '../report.service';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Category } from 'src/app/shared/models/Category';
import { ExportData } from 'src/app/shared/models/ExportData';

@Component({
  selector: 'app-view-customers-report',
  templateUrl: './view-customer-report.component.html',
  styleUrls: ['./view-customer-report.component.css']
})
export class ViewUserPoolComponent implements OnInit {
    _shown = true;
    user: any;
    userArray: any[] = [];
    email: any;
    investments: Investment;
    users: User[];
    dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
    p = 1;
    p2 = 1;
    routeUser: string ;
    currentURL: string;
    userInvestment: any[];
    dashboardInvestment: any = [];
    alluserInvestment: any = [];
    isLoading = true;
    selectedInvestment = -1;
    investmentInfo: Investment = {duration: '0', investment_amount: 0};
    poolId: any;
    pageValue = 5;
    categories: any [];
    res: Category;
    numOfPool: any =[];

    constructor(
      private route: ActivatedRoute,
      private investmentService: InvestmentService,
      private userService: UserService,
      private router: Router,
      private reportService: ReportService,
      private location: Location
      ) {
        this.email = this.route.snapshot.paramMap.get('email'); // Snapshot param
        this.isLoading = true;
        this.userService.getProfileDetails(this.email).subscribe(userx => {
          if (userx && userx.success) {
            this.user = userx.success.Data;
            this.userArray.push(userx.success.Data);
            console.log(this.userArray);
          }
          this.isLoading = false;
        });
        this.investmentService.getUserInvestments(this.email).subscribe(investments => {
          if (investments && investments.success) {
            this.userInvestment = investments.success.Data;
            this.numOfPool = investments.success.Inv;
          }
          this.isLoading = false;
        });
        this.investmentService.getCategories().subscribe(resp => {
          if (resp && resp.success) {
            this.categories = resp.success.Data;
          }
          this.isLoading = false;
        });
      }

    ngOnInit() {

    }

    getCategoryName(id) {
      if (this.categories && id) {
      this.res = this.categories.find(r => r.id === id);
      return this.res.category_name;
      } else {
        return this.res = {category_name: ''};
      }
    }

    goto(email: User, id: number): void {
      this.router.navigate([`/admin/userReport/${email}/export/${id}`]);
    }

    Back() {
        this.location.back();
    }

    setItemsPerPage(event) {
        this.pageValue = event;
    }

    saveAsCSV() {
        if (this.userInvestment.length > 0) {
          const items: ExportData[] = [];
          let i = 0;
          this.userInvestment.forEach(line => {
            const csvLine = {
              title: line.title,
              category_name: `${this.getCategoryName(line.category_id)}`,
              investment_amount: line.investment_amount,
              duration: line.duration,
              percentage: line.estimated_percentage_profit,
              expected_return_period: line.expected_return_period,
              number_of_pools: this.numOfPool[i].number_of_pools,
              total_amount_invested: line.investment_amount * this.numOfPool[i].number_of_pools,
              is_investment_started: line.is_investment_started ,
              investment_started_date: line.investment_started_date
            };
            items.push(csvLine);
            i++;
          });

          this.reportService.exportToCsv('viewCustomerReport.csv', items);
        }
    }

  }
