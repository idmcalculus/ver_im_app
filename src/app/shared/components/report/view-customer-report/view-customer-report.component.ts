import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { User } from 'src/app/shared/models/user';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-view-customers-report',
  templateUrl: './view-customer-report.component.html',
  styleUrls: ['./view-customer-report.component.css']
})
export class ViewUserPoolComponent implements OnInit {
    _shown = true;
    user: any;
    email: any;
    investments: Investment;
    users: User[];
    dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
    p = 1;
    p2 = 1;
    routeUser: string ;
    currentURL: string;
    userInvestment: Investment[];
    FilteredInvestment: Investment[];
    dashboardInvestment: any = [];
    alluserInvestment: any = [];
    isLoading: boolean;
    selectedInvestment = -1;
    investmentInfo: Investment = {duration: '0', investment_amount: 0};
    poolId: any;
    categories: any [];
    res: Category;
    numOfPool: Investment[];

    constructor(
      private route: ActivatedRoute,
      private investmentService: InvestmentService,
      private userService: UserService,
      private router: Router,
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
        this.investmentService.getUserInvestments(this.email).subscribe(investments => {
          if (investments && investments.success) {
            this.userInvestment = investments.success.Data;
            this.numOfPool = investments.success.Inv;
            this.isLoading = false;
          }
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

  }
