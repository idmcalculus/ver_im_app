 import { Component, OnInit } from '@angular/core';
 import { Router} from '@angular/router';
 import { InvestmentService } from '../../investment/investment.service';
 import { Investment } from 'src/app/shared/models/Investment';
 import { AppAuthService } from 'src/app/core/auth/auth.service';
 import { UserService } from '../user.service';

 @Component({
  selector: 'app-userPools',
  templateUrl: './user-pool.component.html',
  styleUrls: ['./user-pool.component.scss']
})
export class UserPoolsComponent implements OnInit {
  isLoading = true;
  pools: Investment[] = [];
  pool: any = {title: '', investment_amount: 0, };
  userType: string;
  categories: any [];
  searchValue = '';
  filteredPools = [];
  masterSelected: boolean;
  checklist: any;
  checkedList: any;

  constructor(
    private router: Router,
    private authService: AppAuthService,
    private investmentService: InvestmentService) {
      this.isLoading = true;
      const userpath = window.location.pathname;
      if (userpath.includes('user')) {
        this.userType = 'user';
        this.authService.currentUser.subscribe(resp => {
          if (resp) {
            this.getUserPols(resp.email);
          }
          this.isLoading = false;
        });
      } else {
        this.userType = 'admin';
        this.getPools();
        this.getCategories();
      }
      this.getCategories();
      this.masterSelected = false;
      this.checklist = [this.pool, ];
      this.getCheckedPooList();

  }

  ngOnInit() {
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

  getPools() {
    this.isLoading = true;
    this.investmentService.getInvestments(false).subscribe(investments => {
      if (investments) {
        this.pools = investments.success.Data;
      }
      this.isLoading = false;
    });
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

  getUserPols(email) {
    this.isLoading = true;
    this.investmentService.getUserInvestments(email).subscribe(investments => {
      if (investments) {
        this.pools = investments.success.Data;
        console.log(this.pools);
        this.getCategories();
      }
      this.isLoading = false;
    });
  }

  cancelPool() {
    this.router.navigateByUrl('admin/addpools');
  }

  setPlanOperation(investment) {
    this.authService.setCurrentPlanOperation(investment);
  }

  setHeaderandFooter() {
    this.authService.setInProfileView(false);
  }

  // filterTable(filterType, filterValue: string) {
  //   if (!filterValue || filterValue === null) {
  //     return this.getPools();
  //   } else {
  //       const filtered = this.pools.filter(pool => {
  //         if (pool[filterType] !== null) {
  //           return pool[filterType].toLowerCase().includes(filterValue.toLowerCase());
  //         }
  //       });
  //       console.log(filtered);
  //       this.pools = filtered;
  //     }
  // }

  calculateAmount(returns, inv) {
    const estimate = returns * inv;
    return Math.ceil(estimate);
  }
}
