 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Investment } from 'src/app/shared/models/Investment';
import { AdminService } from '../../../../modules/admin/admin.service';
import { UserService } from '../../../../modules/user/user.service';
import {InvestmentService} from '../../../../modules/investment/investment.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pools',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class UserreportComponent implements OnInit {
  searchValue = '';
  users: User [];
  user: User = {email: ''};
  selectedUser: User;
  selectedEditUser: User;
  selectedDelUser: User;
  checkedUser = [];
  isLoading= true;
  selectedAll;
  selectedInvestment = -1;
  dashboardInvestment: any =[];
  userInvestment: any;
  investmentInfo: Investment = {duration: '0', investment_amount: 0};
  dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};

  constructor(
    private userService: UserService,
    private investmentService:InvestmentService,
    private adminService: AdminService,
    private dynamicScrLoader: DynamicScriptLoaderService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
    console.log(this.user.email);
    this.investmentService.getUserInvestments(this.user.email).subscribe(investments=>{
      if(investments.success.Data !== 0){
        this.userInvestment = investments.success.Data;
        console.log(this.userInvestment);
        this.selectedInvestment = 0;
        this.showDetails();
      }
    });
    this.adminService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.users = resp.success.Data;
        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');
        this.dynamicScrLoader.loadSingle('trigger-data-table');
      }
    });
  }
  
  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.users = resp.success.Data;
      }
      this.isLoading = false;
    });
  }

  showDetails() {
    if (this.selectedInvestment >= 0) {
      console.log(this.userInvestment);
      this.investmentInfo = this.userInvestment[this.selectedInvestment];
      
      this.getUserDashBoard();
      this.selectedInvestment++;
      console.log(this.selectedInvestment);
      return this.selectedInvestment;
      } else {
      this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
      console.log(this.investmentInfo);
    }

  }
  
  getUserDashBoard() {
    console.log(this.user.email);
    const userEmail = this.user.email;
    const investmentId = this.investmentInfo.id;
    
    this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
      if (resp && resp.success) {
        this.dashBoardData = resp.success.Data;
        console.log(this.dashBoardData);
        this.dashboardInvestment.push(this.dashBoardData);
      } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
        console.log(this.dashBoardData);
      }
      console.log(this.dashboardInvestment);
      this.showDetails();
    });
  }

  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value;

    if (!value) {
      return this.users;
    } else {
      const filtered = this.users.filter(user => {
        if (user[filterType] !== null) {
        return user[filterType].toLowerCase().includes(value.toLowerCase())
        }
      });
      this.users = filtered;
    }
  }
}
