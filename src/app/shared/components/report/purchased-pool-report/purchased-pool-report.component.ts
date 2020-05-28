 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Router} from '@angular/router';
 import {InvestmentService} from '../../../../modules/investment/investment.service';
 import { Investment } from 'src/app/shared/models/Investment';
 import { AppAuthService } from 'src/app/core/auth/auth.service';
 import { UserService } from '../../../../modules/user/user.service';
 import { ReportService } from '../report.service';
 import { ExportData } from 'src/app/shared/models/ExportData';

 @Component({
  selector: 'app-pools',
  templateUrl: './purchased-pool-report.component.html',
  styleUrls: ['./purchased-pool-report.component.scss']
})
export class PurchasedreportComponent implements OnInit {
  isLoading= true;
  pools: Investment[] = [];
  pool: Investment = {title: '', investment_amount: 0, };
  userType: string;
  result: any [];
  categories: any [];
  searchValue = '';
  filteredPools = [];
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  p2 = 1;
  pageValue = 5;

  constructor(
    private router: Router,
    private authService: AppAuthService,
    private investmentService: InvestmentService,
    private reportService: ReportService,
    private userService: UserService) {
      const userpath = window.location.pathname;
      if (userpath.includes('user')) {
        this.userType = 'user';
        this.authService.currentUser.subscribe(resp => {

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
        this.result = investments.success.Data;
        this.pools = this.result.filter(x => x.num_of_pools_taken > 0);
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
    const res = this.categories.find( r => r.id === id);
    return res.category_name;
  }

  cancelPool() {
    this.router.navigateByUrl('admin/addpools');
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
        this.pools = filtered;
      }
  }

  calculateEstimate(returns, inv) {
    const estimate = (((returns * 12) - inv) / inv) * 100;
    return Math.ceil(estimate);
  }

  clearSearch() {
        this.searchValue = null;
        return this.getPools();
    }

  saveAsCSV() {
    if (this.pools.length > 0) {
      const items: ExportData[] = [];

      this.pools.forEach(line => {
        const reportDate = new Date();
        const csvLine: ExportData = {
          date: `${reportDate.getDate()}/${reportDate.getMonth() + 1}/${reportDate.getFullYear()}`,
          title: line.title,
          category_id: line.category_id,
          investment_amount: line.investment_amount,
          max_no_of_slots: line.max_num_of_slots,
          total: line.max_num_of_slots * line.investment_amount,
        };
        items.push(csvLine);
      });

      this.reportService.exportToCsv('ProductsPurchasedReport.csv', items);
    }
}


  setItemsPerPage(event) {
      this.pageValue = event;
  }

}
