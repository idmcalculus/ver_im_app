 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Router} from '@angular/router';
 import {InvestmentService} from '../../investment/investment.service';
 import { Investment } from 'src/app/shared/models/Investment';
 import { AppAuthService } from 'src/app/core/auth/auth.service';
 import { UserService } from '../user.service';
 import { Category } from 'src/app/shared/models/Category';
 import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
 import { FormControl } from '@angular/forms';

 @Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: PoolsComponent },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'} }
  ]
})
export class PoolsComponent implements OnInit {
  pageValue = 10;
  isLoading = true;
  pools: Investment[] = [];
  pool: Investment = {title: '', investment_amount: 0, };
  userType: string;
  categories: any [];
  searchValue = '';
  filteredPools = [];
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  res: Category;
  status = new FormControl();

  constructor(
    private router: Router,
    private authService: AppAuthService,
    private investmentService: InvestmentService,
    private userService: UserService) {
      const userpath = window.location.pathname;
      if (userpath.includes('user')) {
        this.userType = 'user';
        this.authService.currentUser.subscribe(resp => {
          if (resp) {
            this.getUserPols(resp.email);
          }
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
    this.masterSelected = this.checklist.every(function(pool: any) {
        return pool == true;
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
        console.log(this.pools);
      }
      this.isLoading = false;
    });
  }

  getCategories() {
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
      }
      this.isLoading = false;
    });
  }

  getCategoryName(id) {
    if (id) {
    this.res = this.categories.find(r => r.id === id);
    return this.res.category_name;
    } else {
      return this.res = {category_name: ''};
    }
  }

  getUserPols(email) {
    this.investmentService.getUserInvestments(email).subscribe(investments => {
      if (investments) {
        this.pools = investments.success.Data;
        this.getCategories();
      }
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

  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value;
    if (!value || value === null) {
      return this.getPools();
    } else {
        const filtered = this.pools.filter(pool => {
          if (pool[filterType] !== undefined && pool[filterType] !== null) {
            const filterate = pool[filterType].toString();
            return filterate.toLowerCase().includes(value.toLowerCase());
          }
        });
        this.pools = filtered;
      }
  }

  filterCategory(filterType, filterValue): any {
    const value = filterValue.target.value;
    const CatPool: any = [];
    if (!value || value === null) {
      return this.getPools();
    } else {
      const filteredCat = this.categories.filter(category => {
        if (category[filterType] !== null) {
          return category[filterType].toLowerCase().includes(value.toLowerCase());
        }
      });
      filteredCat.forEach(cat => {
        const filteredCatPool = this.pools.filter(eachpool => cat.id === eachpool.category_id);
        CatPool.push(filteredCatPool);
      });
      this.pools = [].concat.apply([], CatPool);
      }
  }

  filterStatus(filterType, filterValue): any {
    const value = filterValue === 'Active' ? 1 :
    filterValue === 'InActive' ? 0 : null;
    if (value === null) {
      return this.getPools();
    } else {
        const filtered = this.pools.filter(pool => {
          if (pool[filterType] !== undefined && pool[filterType] !== null) {
            return pool[filterType] === value;
          }
        });
        this.pools = filtered;
      }
  }

  clearFilter(value) {
    if (value !== null) {
    return this.getPools();
    }
  }

  setItemsPerPage(event) {
    this.pageValue = event;
  }

  calculateEstimate(returns, inv) {
    const estimate = (((returns * 12) - inv) / inv) * 100;
    return Math.ceil(estimate);
  }

  deleteUser() {}
}
