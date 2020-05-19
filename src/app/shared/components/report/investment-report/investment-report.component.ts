 import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import {InvestmentService} from '../../../../modules/investment/investment.service';
 import { Investment } from 'src/app/shared/models/Investment';
import { ReportService } from '../report.service';
import { ExportData } from 'src/app/shared/models/ExportData';
import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FilterTablesPipe } from 'src/app/filter-tables.pipe';
import { Category } from 'src/app/shared/models/Category';

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
  categories: any [];
  res: Category;
  searchValue = '';
  filteredPools = [];
  p2 = 1;
  pageValue = 5;
  dateEnd: '';
  dateStart: '';
  status = new FormControl();
  Category = new FormControl();
  order = "date";
  ascending = false;

  constructor(
    private router: Router,
    private investmentService: InvestmentService,
    private filterby: FilterTablesPipe,
    private reportService: ReportService)
     {
       this.getCategories();
  }

  ngOnInit() {
    this.investmentService.getpoolReport().subscribe(resp => {
        if (resp && resp.success) {
          this.data = resp.success.Data;
          this.data.shift()
          this.report = this.filterby.transform(this.data, this.order, this.ascending);
          this.reportlog = this.filterby.transform(this.data, this.order, this.ascending);

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
    if (this.categories && id) {
    this.res = this.categories.find(r => r.id === id);
    return this.res.category_name;
    } else {
      return this.res = {category_name: ''};
    }
  }

  cancelPool() {
    this.router.navigateByUrl('admin/addpools');
  }



  filterCategory(filterType, filterValue): any {
    if (filterValue === 'All') {
      this.report = this.reportlog;
    } else {
      const CatPool: any = [];
      const filteredCat = this.categories.filter(category => category[filterType].toLowerCase() === filterValue.toLowerCase());
      filteredCat.forEach(cat => {
        const filteredCatPool = this.reportlog.filter(investment => cat.id === investment.category_id);
        CatPool.push(filteredCatPool);
      });
      this.report = [].concat.apply([], CatPool);

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
      let filtered = this.reportlog.filter(pool => pool[filterType] === value);
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
        let csvLine: ExportData = {
          date_range: `${this.dateStart} - ${this.dateEnd}`,
          date: line.date,
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
    this.dateEnd = '';
    this.dateStart = '';
    this.searchValue = null;
    return this.report = this.reportlog;
  }


setItemsPerPage(event){
    this.pageValue = event;
}

}
