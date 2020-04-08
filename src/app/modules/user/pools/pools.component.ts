 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Router} from '@angular/router';
 import {InvestmentService} from '../../investment/investment.service';
 import { Investment } from 'src/app/shared/models/Investment';
 import { AppAuthService } from 'src/app/core/auth/auth.service';
 import { UserService } from '../user.service';

 @Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.scss']
})
export class PoolsComponent implements OnInit {
  isLoading = true;
  pools: Investment[] = [];
  pool: Investment;
  userType: string;
  categories = [];
  category_name: string;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  filteredPools = [];
  searchValue = '';

  constructor(
    private authService: AppAuthService,
    private router: Router,
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

      this.getPools();
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
        console.log(this.pools);
      }
      this.isLoading = false;
    });
  }

  getCategories() {
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
        console.log(this.categories);
      }
      this.isLoading = false;
    });
  }

  getCategoryName(id: number) {
    const res = this.categories.find( r => r.id);
    return res.category_name;
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
          if (pool[filterType] !== null) {
            const filterate = pool[filterType].toString();
            return filterate.toLowerCase().includes(value.toLowerCase());
          }
        });
        this.pools = filtered;
      }
  }

  calculateEstimate(returns, inv) {
    const estimate = (((returns * 12) - inv) / inv) * 100;
    return Math.ceil(estimate);
  }

}
