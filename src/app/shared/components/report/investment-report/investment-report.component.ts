 import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import {InvestmentService} from '../../../../modules/investment/investment.service';
 import { Investment } from 'src/app/shared/models/Investment';
import { ReportService } from '../report.service';
import { ExportData } from 'src/app/shared/models/ExportData';

 @Component({
  selector: 'app-pools',
  templateUrl: './investment-report.component.html',
  styleUrls: ['./investment-report.component.scss']
})
export class PoolreportComponent implements OnInit {
  isLoading = true;
  pools: Investment[] = [];
  pool: Investment = {title: '', investment_amount: 0 };
  report = [];
  reportlog = [];
  searchValue = '';
  filteredPools = [];
  p2 = 1;
  pageValue = 5;

  constructor(
    private router: Router,
    private investmentService: InvestmentService,
    private reportService: ReportService,) {

      this.investmentService.getpoolReport().subscribe(resp => {
        if (resp && resp.success) {
          this.report = resp.success.Data;
          this.report.shift()
          this.reportlog.push(this.report);
        }
        this.isLoading = false;
      });

  }

  ngOnInit() {}

  getPools() {
    this.isLoading = true;
    this.investmentService.getInvestments(false).subscribe(investments => {
      if (investments) {
        this.pools = investments.success;
      }
      this.isLoading = false;
    });
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

  saveAsCSV() {
    if(this.report.length > 0){
      const items: ExportData[] = [];

      this.report.forEach(line => {
        let reportDate = new Date();
        let csvLine: ExportData = {
          date: `${reportDate.getDate()}/${reportDate.getMonth()+1}/${reportDate.getFullYear()}`,
          date_start: line.date_start,
          date_end: line.date_end,
          no_of_investments: line.no_of_investments,
          no_of_slots: line.no_of_slots,
          total_amount_invested: line.total_amount_invested,
        }
        items.push(csvLine);
      });

      this.reportService.exportToCsv('ProductsViewedReport.csv', items);
    }
}
  clearSearch() {
    this.searchValue = null;
    return this.getPools();
  }


setItemsPerPage(event){
    this.pageValue = event;
}

}
