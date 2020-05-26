 import { Component, OnInit, Input } from '@angular/core';
 import { Router } from '@angular/router';
 import { ExportData } from 'src/app/shared/models/ExportData';
 import { ReportService } from '../report.service';
 import { User } from 'src/app/shared/models/user';
 import { Investment } from 'src/app/shared/models/Investment';
 import { AdminService } from '../../../../modules/admin/admin.service';
 import { UserService } from '../../../../modules/user/user.service';
 import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
 import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
 import { FormControl } from '@angular/forms';
 import { FilterTablesPipe } from 'src/app/shared/services/filter-table/filter-tables.pipe';

 @Component({
  selector: 'app-pools',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: UserreportComponent },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'} }
  ]
})
export class UserreportComponent implements OnInit {
  user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  searchValue = '';
  users: any [];
  data: any [];
  allUsers: any [];
  p2 = 1;
  pageValue = 5;
  selectedUser: User;
  checkedUser = [];
  isLoading = true;
  selectedAll;
  alluserInvestment: any = [];
  selectedInvestment = -1;
  dashboardInvestment: any = [];
  userInvestment: any;
  userPool: any;
  investmentInfo: Investment = {title: '', investment_amount: 0, };
  report = {};
  reportlog = [];
  latest_return = 0;
  currentlog = {no_of_pools_invested: 0};
  email: any;
  status = new FormControl();
  dateEnd: '';
  dateStart: '';
  order = 'last_name';
  ascending = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private adminService: AdminService,
    private dynamicScrLoader: DynamicScriptLoaderService,
    private filterby: FilterTablesPipe,
    private reportService: ReportService
    ) {
      this.getpool(this.email);
    }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.data = resp.success.Data;
        this.users = this.filterby.transform(this.data, this.order, this.ascending);
        this.allUsers = this.filterby.transform(this.data, this.order, this.ascending);
        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');
        this.dynamicScrLoader.loadSingle('trigger-data-table');
      }
    });
  }


  getUsers() {
    this.adminService.getUsers().subscribe(resp => {
        if (resp && resp.success) {
          this.users = resp.success.Data;
        }
  });
}

  getpool(email) {
    this.adminService.getDashBoardData().subscribe(resp => {
      if (resp && resp.success) {
        this.report = resp.success.Data;
        this.reportlog.push(this.report);
        this.currentlog = this.reportlog[0].total_users_with_investment.filter((i) => i.email == email);
      }
    });
  }

  goto(user: User): void {
    this.router.navigate([`/admin/userReport/${user.email}`]);

  }


  filterTable(dateStart, dateEnd): any {
    const filterStart = dateStart;
    const filterEnd = dateEnd;
    if ( filterStart && filterEnd) {
        const selectedUsers = this.users.filter(range => {
            if ( range.created_at > filterStart && range.created_at < filterEnd) {
              return range;
            }
        });
        this.users = selectedUsers;
    } else {
        return this.users;

    }
  }

  filterStatus(filterType, filterValue): any {
    if (filterValue === 'All') {
      this.users = this.allUsers;
    } else if (filterValue === 'InActive') {
        const value = 0;
        const filtered = this.allUsers.filter(user => user[filterType] === value);
        this.users = filtered;
    } else {
      const value = 1;
      const filtered = this.allUsers.filter(user => user[filterType] >= value);
      this.users = filtered;
    }
  }

  clearFilter() {
      this.dateStart = '';
      this.dateEnd = '';
      this.status.setValue('');
      this.users = this.allUsers;
  }

  saveAsCSV() {
    if (this.users.length > 0) {
      const items: ExportData[] = [];

      this.users.forEach(line => {
        const reportDate = new Date();
        const csvLine: ExportData = {
          date: `${reportDate.getDate()}/${reportDate.getMonth() + 1}/${reportDate.getFullYear()}`,
          first_name: line.first_name,
          last_name: line.last_name,
          email: line.email,
          phone_number: line.phone_number,
          no_of_investments: line.no_of_investments,
          total_amount_invested: line.total_amount_invested
        };
        items.push(csvLine);
      });

      this.reportService.exportToCsv('CustomerReport.csv', items);
    }
}

setItemsPerPage(event) {
    this.pageValue = event;
}

  getTotalInv(email) {
    this.userService.getProfileDetails(email).subscribe(investments => {
      if (investments.success.Data !== 0) {
        this.userInvestment = investments.success.Data;
        return this.userInvestment.total;
      } else {
      }
    });
  }
}
