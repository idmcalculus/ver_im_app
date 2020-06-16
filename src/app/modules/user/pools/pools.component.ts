 import { Component, OnInit } from '@angular/core';
 import { Router} from '@angular/router';
 import { InvestmentService } from '../../investment/investment.service';
 import { Investment } from 'src/app/shared/models/Investment';
 import { AppAuthService } from 'src/app/core/auth/auth.service';
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
  p2 = 1;
  res: Category;
  status = new FormControl();
  Category = new FormControl();
  investments: Investment[] = [];
  filteredArray: Investment[] = [];
  eventValue = '';

  constructor(
    private router: Router,
    private authService: AppAuthService,
    private investmentService: InvestmentService) {
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
        this.investments = investments.success.Data;
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
    // console.log(id);
    
    if (this.categories && id) {
    this.res = this.categories.find(r => r.id === id);
      if(this.res){
        return this.res.category_name;
      }else{ return this.res = {category_name: ''} }
    } else {
      return this.res = {category_name: ''};
    }
  }

  getUserPols(email) {
    this.isLoading = true;
    this.investmentService.getUserInvestments(email).subscribe(investments => {
      if (investments) {
        this.pools = investments.success.Data;
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

  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value.toString().toLowerCase();
    if (!value) {
      this.filteredArray = [];
      this.pools = this.investments;
    } else {
        if (this.filteredArray.length === 0) {
          const filtered = this.investments.filter(investment => {
            const filterate = investment[filterType].toString().toLowerCase();
            if (filterate.indexOf(value) >= 0) {
              return investment;
            }
          });
          this.pools = filtered;
          this.filteredArray = this.pools;
        } else {
            const filtered = this.filteredArray.filter(investment => {
              const filterate = investment[filterType].toString().toLowerCase();
              if (filterate.indexOf(value) >= 0) {
                return investment;
              }
            });
            this.pools = filtered;
            this.filteredArray = this.pools;
          }
      }
  }

  filterCategory(filterType, filterValue): any {
    if (filterValue === 'All') {
      this.filteredArray = [];
      this.pools = this.investments;
    } else {
        if (this.filteredArray.length === 0) {
          const CatPool: any = [];
          const filteredCat = this.categories.filter(category => category[filterType].toLowerCase() === filterValue.toLowerCase());
          filteredCat.forEach(cat => {
            const filteredCatPool = this.investments.filter(investment => cat.id === investment.category_id);
            CatPool.push(filteredCatPool);
          });
          this.pools = [].concat.apply([], CatPool);
          this.filteredArray = this.pools;
        } else {
          const CatPool: any = [];
          const filteredCat = this.categories.filter(category => category[filterType].toLowerCase() === filterValue.toLowerCase());
          filteredCat.forEach(cat => {
            const filteredCatPool = this.filteredArray.filter(investment => cat.id === investment.category_id);
            CatPool.push(filteredCatPool);
          });
          this.pools = [].concat.apply([], CatPool);
          this.filteredArray = this.pools;
          }
      }
  }

  filterStatus(filterType, filterValue): any {
    if (filterValue === 'All') {
      this.filteredArray = [];
      this.pools = this.investments;
    } else {
        if (this.filteredArray.length === 0) {
          const value = filterValue === 'Active' ? 1 : 0 ;
          const filtered = this.investments.filter(pool => pool[filterType] === value);
          this.pools = filtered;
          this.filteredArray = this.pools;
        } else {
          const value = filterValue === 'Active' ? 1 : 0 ;
          const filtered = this.filteredArray.filter(pool => pool[filterType] === value);
          this.pools = filtered;
          this.filteredArray = this.pools;
          }
      }
  }

  setItemsPerPage(event) {
    this.pageValue = event;
  }

  deleteUser() {}
}
