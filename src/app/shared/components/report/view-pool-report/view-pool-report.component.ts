 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {InvestmentService} from '../../../../modules/investment/investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { UserService } from '../../../../modules/user/user.service';
import { ReportService } from '../report.service';
import { ExportData } from 'src/app/shared/models/ExportData';

@Component({
  selector: 'app-pools',
  templateUrl: './view-pool-report.component.html',
  styleUrls: ['./view-pool-report.component.scss']
})
export class ViewedreportComponent implements OnInit {
  isLoading:boolean=true;
  pools:Investment[]=[];
  pool:Investment = {title: '', investment_amount: 0, };
  userType:string;
  categories:any []
  searchValue = '';
  filteredPools = [];
  masterSelected:boolean;
  checklist:any;
  checkedList:any;

  constructor(
    private router:Router,
    private authService: AppAuthService,
    private investmentService: InvestmentService,
    private reportService: ReportService,
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
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
      }
      this.isLoading = false;
    });
  }

  getCategoryName(id: number) {
    const res = this.categories.find( r => r.id === 21);
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

  filterTable(filterType, filterValue: string) {
    if (!filterValue || filterValue === null) {
      return this.getPools();
    } else {
        const filtered = this.pools.filter(pool => {
          if (pool[filterType] !== null) {
            return pool[filterType].toLowerCase().includes(filterValue.toLowerCase());
          }
        });
        console.log(filtered);
        this.pools = filtered;
      }
  }

  calculateEstimate(returns,inv){
    const estimate = (((returns*12) - inv)/inv) * 100;
    return Math.ceil(estimate);
  }

  divisorFunc(expected_return_period) {
    if ( expected_return_period === "Weekly") {
        return 48;
    } else if (expected_return_period === "Monthly") {
        return 12;
    }
}

  clearSearch() {
    this.searchValue = null;
    return this.getPools();
  }

  saveAsCSV() {
    if(this.pools.length > 0){
      const items: ExportData[] = [];

      this.pools.forEach(line => {
        let reportDate = new Date();
        let csvLine: ExportData = {
          date: `${reportDate.getDate()}/${reportDate.getMonth()+1}/${reportDate.getFullYear()}`,
          id: line.id,
          title: line.title,
          category_id: line.category_id,
          expected_return_period:line.expected_return_period,
          investment_amount:line.investment_amount,
        }
        items.push(csvLine);
      });

      this.reportService.exportToCsv('myCsvDocumentName.csv', items);
    }
}
}
