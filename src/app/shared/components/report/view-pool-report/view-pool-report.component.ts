 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {InvestmentService} from '../../../../modules/investment/investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { ReportService } from '../report.service';
import { ExportData } from 'src/app/shared/models/ExportData';

@Component({
  selector: 'app-pools',
  templateUrl: './view-pool-report.component.html',
  styleUrls: ['./view-pool-report.component.scss']
})
export class ViewedreportComponent implements OnInit {
  isLoading:boolean=true;
  pools: any[]=[];
  pool:Investment = {title: '', investment_amount: 0, };
  userType:string;
  categories:any [];
  searchValue = '';
  filteredPools = [];
  p2 = 1;
  pageValue = 5;

  constructor(
    private router:Router,
    private authService: AppAuthService,
    private investmentService: InvestmentService,
    private reportService: ReportService,) {
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

  }

  ngOnInit() {
  }


  getPools() {
    this.isLoading = true;
    this.investmentService.getDetails().subscribe(investments => {
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

  getCategoryName(id) {
    const res = this.categories.find( r => r.id === id);
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

  percentages(pool){
    let total=0;
    this.pools.forEach(element => {
      total+=element.no_of_views
    });
    return ((pool/total)*100).toFixed(2);
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
          title: line.title,
          category_id: line.category_id,
          investment_amount:line.investment_amount,
          viewed:line.no_of_views,
          percentage: Number(this.percentages(line.no_of_views as any)),
        }
        items.push(csvLine);
      });

      this.reportService.exportToCsv('ProductViewedReport.csv', items);
    }
}


setItemsPerPage(event){
    this.pageValue = event;
}

}
