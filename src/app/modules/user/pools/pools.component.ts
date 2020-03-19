import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {InvestmentService} from '../../investment/investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {
  isLoading:boolean=true;
  pools:Investment[]=[];
  pool:Investment;
  userType:string;
  masterSelected:boolean;
  checklist:any;
  checkedList:any;

  constructor(
    private authService:AppAuthService,
    private router:Router,
    private investmentService:InvestmentService,
    private userService:UserService) { 
      let userpath = window.location.pathname;
      if(userpath.includes('user')){
        this.userType = 'user';
        this.authService.currentUser.subscribe(resp=>{
          if(resp){
            this.getUserPols(resp.email);
          }
        })
      }else{
        this.userType = 'admin';
        this.getPools();
      }
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

  getPools(){
    this.investmentService.getInvestments(false).subscribe(investments=>{
      if(investments){
        this.pools = investments.success.Data
      }
      this.isLoading=false;
    })
  }

  getUserPols(email){
    this.investmentService.getUserInvestments(email).subscribe(investments=>{
      if(investments){
        this.pools = investments.success.Data
      }
      this.isLoading=false;
    })
  }

  cancelPool() {
    this.router.navigateByUrl('admin/addpools');
  }

  setPlanOperation(investment){
    this.authService.setCurrentPlanOperation(investment);
  }

  setHeaderandFooter(){
    this.authService.setInProfileView(false);
  }

  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value;

    if (!value) {
      return this.pools;
    } else {
      const filtered = this.pools.filter(pool => {
        if (pool[filterType] !== null) {
        return pool[filterType].toLowerCase().includes(value.toLowerCase())
        }
      });
      console.log('Filtered', filtered);
      this.pools = filtered;
    }
  }

  
}
