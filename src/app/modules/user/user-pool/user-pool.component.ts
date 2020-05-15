 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {InvestmentService} from '../../investment/investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userPools',
  templateUrl: './user-pool.component.html',
  styleUrls: ['./user-pool.component.scss']
})
export class userPoolsComponent implements OnInit {
  isLoading = true;
  pageValue = 5;
  pools:Investment[]=[];
  peel:Investment[]=[];
  pool:any = {title: '', investment_amount: 0, };
  userType:string;
  categories:any []
  searchValue = '';
  filteredPools = [];
  masterSelected:boolean;
  checklist:any;
  checkedList:any;
  p2 = 1;

  constructor(
    private router:Router,
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
        this.getCategories();
      }
      this.getCategories();
      this.masterSelected = false;
      this.checklist = [this.pool,];
      this.getCheckedPooList();
      
  }

  ngOnInit() {
  }
  
  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i] = this.masterSelected;
    }
    this.getCheckedPooList();
  }

  isAllSelected() {
    this.masterSelected = this.checklist.every(function(pool:any) {
        return pool == true;
      })
    this.getCheckedPooList();
  }
 
  getCheckedPooList(){
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if(this.checklist[i])
      this.checkedList.push(this.checklist[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
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
    const res = this.categories.find( r => r.id === id);
    return res.category_name;
  }

  getUserPols(email) {
    this.investmentService.getUserInvestments(email).subscribe(investments => {
      if (investments) {
        this.peel = investments.success;
        this.pools.push(this.peel);
        //console.log(this.pools);
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

  setItemsPerPage(event){
    this.pageValue = event;
  }
  
  calculateEstimate(pool) {
    const returns = pool.expected_return_amount;
    const dur = pool.expected_return_period === 'Monthly' ? 12 : 48;
    const inv = pool.investment_amount;
    const estimate = (((returns * dur)/inv) * 100);
    return Math.ceil(estimate);
    
  }

  calculateAmount(returns,inv){
    const estimate = returns * inv;
    return Math.ceil(estimate);
  }
}
