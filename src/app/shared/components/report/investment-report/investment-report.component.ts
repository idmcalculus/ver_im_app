 import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import {InvestmentService} from '../../../../modules/investment/investment.service';
 import { Investment } from 'src/app/shared/models/Investment';
import { ReportService } from '../report.service';
import { ExportData } from 'src/app/shared/models/ExportData';
import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FilterTablesPipe } from 'src/app/filter-tables.pipe';

 @Component({
  selector: 'app-pools',
  templateUrl: './investment-report.component.html',
  styleUrls: ['./investment-report.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: PoolreportComponent },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'} }
  ]
})
export class PoolreportComponent implements OnInit {
  isLoading = true;
  pools: Investment[] = [];
  pool: Investment = {title: '', investment_amount: 0 };
  report = [];
  data = [];
  reportlog = [];
  searchValue = '';
  filteredPools = [];
  p2 = 1;
  pageValue = 5;
  dateEnd: '';
  dateStart: '';
  status = new FormControl();
  order = "date";
  ascending = false;

  constructor(
    private router: Router,
    private investmentService: InvestmentService,
    private filterby: FilterTablesPipe,
    private reportService: ReportService,) {

      this.investmentService.getpoolReport().subscribe(resp => {
        if (resp && resp.success) {
          this.data = resp.success.Data;
          this.data.shift()
          this.report = this.filterby.transform(this.data, this.order, this.ascending);
          this.reportlog = resp.success.Data;
          console.log(this.report);


 //         this.reportlog.push(this.report);

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

  filterStatus(filterType, filterValue): any {
    if (filterValue === 'All') {
      this.report = this.reportlog;
    } else if (filterValue === 'InActive') {
        let value = 0;
        let filtered = this.reportlog.filter(pool => pool[filterType] === value);
        this.report = filtered;
    } else {
      let value = 1;
      let filtered = this.reportlog.filter(pool => pool[filterType] >= value);
      this.report = filtered;
    }
  }


  filterDate(dateStart, dateEnd): any {
    let filterStart = dateStart;
    let filterEnd = dateEnd;
    if( filterStart && filterEnd){
        const selectedLogs = this.report.filter(range => {
            if ( range.date > filterStart && range.date < filterEnd)
               return range;
        });
        this.report = selectedLogs;
    } else {
        return this.report;

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
