 import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ExportData } from 'src/app/shared/models/ExportData';
import { ReportService } from '../report.service';
import { User } from 'src/app/shared/models/user';
import { Investment } from 'src/app/shared/models/Investment';
import { AdminService } from '../../../../modules/admin/admin.service';
import { UserService } from '../../../../modules/user/user.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';

@Component({
  selector: 'app-pools',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class UserreportComponent implements OnInit {
  user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  searchValue = '';
  users: any [];
  p2 = 1;
  pageValue = 5;
  selectedUser: User;
  checkedUser = [];
  isLoading= true;
  selectedAll;
  alluserInvestment: any =[];
  selectedInvestment = -1;
  dashboardInvestment: any =[];
  userInvestment: any;
  userPool: any;
  investmentInfo: Investment = {title: '', investment_amount: 0,};
  report = {};
  reportlog = [];
  latest_return = 0;
  currentlog = {no_of_pools_invested: 0};
  email:any;

  constructor(
    private router: Router,
    private userService: UserService,
    private adminService: AdminService,
    private dynamicScrLoader: DynamicScriptLoaderService,
    private reportService: ReportService
    ) {
      this.getpool(this.email);
    }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.users = resp.success.Data;

        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');
        this.dynamicScrLoader.loadSingle('trigger-data-table');
      }
    });
  }


  getUsers(){
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
        this.currentlog=this.reportlog[0].total_users_with_investment.filter((i)=> i.email==email)
      }
    });
  }

  goto(user: User): void {
    this.router.navigate([`/admin/userReport/${user.email}`]);

  }


  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value;

    if (!value) {
      return this.getUsers();
    } else {
      const filtered = this.users.filter(user => {
        if (user[filterType] !== null) {
        return user[filterType].toLowerCase().includes(value.toLowerCase())
        }
      });
      this.users = filtered;
    }
  }

  clearSearch() {
    this.searchValue = null;
    return this.getUsers();
  }

  saveAsCSV() {
    if(this.users.length > 0){
      const items: ExportData[] = [];

      this.users.forEach(line => {
        let reportDate = new Date();
        let csvLine: ExportData = {
          date: `${reportDate.getDate()}/${reportDate.getMonth()+1}/${reportDate.getFullYear()}`,
          first_name: line.first_name,
          last_name: line.last_name,
          email: line.email,
          phone_number: line.phone_number,
          no_of_investments: line.no_of_investments,
          total_amount_invested: line.total_amount_invested
        }
        items.push(csvLine);
      });

      this.reportService.exportToCsv('CustomerReport.csv', items);
    }
}

setItemsPerPage(event){
    this.pageValue = event;
}

  getTotalInv(email){
    this.userService.getProfileDetails(email).subscribe(investments=>{
      if(investments.success.Data !== 0){
        this.userInvestment = investments.success.Data;
        return this.userInvestment.total
      }
      else {
      }
    });
  }
}
