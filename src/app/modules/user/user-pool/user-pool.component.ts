 import { Component, OnInit } from '@angular/core';
 import { Router} from '@angular/router';
 import { InvestmentService } from '../../investment/investment.service';
 import { Investment } from 'src/app/shared/models/Investment';
 import { AppAuthService } from 'src/app/core/auth/auth.service';

 @Component({
  selector: 'app-userPools',
  templateUrl: './user-pool.component.html',
  styleUrls: ['./user-pool.component.scss']
})
export class UserPoolsComponent implements OnInit {
  isLoading = true;
  pageValue = 5;
  pools: Investment[] = [];
  reports: Investment[] = [];
  pool: any = {title: '', investment_amount: 0, };
  userType: string;
  categories: any [];
  searchValue = '';
  filteredPools = [];
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  p2: any;
  email: string;

  constructor(
    private router: Router,
    private authService: AppAuthService,
    private investmentService: InvestmentService) {
  }

  ngOnInit() {
    this.isLoading = true;
    const userpath = window.location.pathname;
    if (userpath.includes('user')) {
        this.userType = 'user';
        this.email = localStorage.getItem('email');
        this.investmentService.getUserInvestments(this.email).subscribe(investments => {
          if (investments) {
            this.pools = investments.success.Data;
            this.reports = investments.success.Inv;
            this.isLoading = false;
          }
        });
      } else {
        this.userType = 'admin';
        this.getCategories();
      }
    this.getCategories();
    this.masterSelected = false;
    this.checklist = [this.pool, ];
    this.getCheckedPooList();
  }

  checkUncheckAll() {
    for (let i = 0; i < this.checklist.length; i++) {
      this.checklist[i] = this.masterSelected;
    }
    this.getCheckedPooList();
  }

  isAllSelected() {
    this.masterSelected = this.checklist.every((pool: any) => {
        return pool === true;
      });
    this.getCheckedPooList();
  }

  getCheckedPooList() {
    this.checkedList = [];
    for (let i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i]) {
      this.checkedList.push(this.checklist[i]);
      }
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  getCategories() {
    this.isLoading = true;
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
        this.isLoading = false;
      }
    });
  }

  getCategoryName(id) {
    if (this.categories && id) {
      const res = this.categories.find( r => r.id === id);
      return res.category_name;
    }
  }

  /*getUserPols(email) {
    this.isLoading = true;
    this.investmentService.getUserInvestments(email).subscribe(investments => {
      if (investments) {
        this.pools = investments.success.Data;
        this.reports = investments.success.Inv;
      }
      this.isLoading = false;
    });
  }*/

  cancelPool() {
    this.router.navigateByUrl('admin/addpools');
  }

  setPlanOperation(investment) {
    this.authService.setCurrentPlanOperation(investment);
  }

  setHeaderandFooter() {
    this.authService.setInProfileView(false);
  }

  setItemsPerPage(event) {
    this.pageValue = event;
  }

  calculateAmount(returns, inv) {
    const estimate = returns * inv;
    return Math.ceil(estimate);
  }
}
