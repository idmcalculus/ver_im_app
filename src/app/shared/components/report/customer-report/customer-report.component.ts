 import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { ExportData } from 'src/app/shared/models/ExportData';
import { ReportService } from '../report.service';
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
  @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  searchValue = '';
  users: any [];
  selectedUser: User;
  checkedUser = [];
  isLoading= true;
  selectedAll;
  alluserInvestment: any =[];
  selectedInvestment = -1;
  dashboardInvestment: any =[];
  userInvestment: any;
  investmentInfo: Investment = {duration: '0', investment_amount: 0};
  dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  noOfPools: any=[];

  constructor(
    private router: Router,
    private userService: UserService,
    private investmentService:InvestmentService,
    private adminService: AdminService,
    private dynamicScrLoader: DynamicScriptLoaderService,
    private toastrService: ToastrService,
    private reportService: ReportService
    ) {}

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.users = resp.success.Data;
        //console.log(this.users);

        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');
        this.dynamicScrLoader.loadSingle('trigger-data-table');
        this.getDetails();
      }
    });
  }

  getDetails() {
    this.users.forEach(user=>
      this.investmentService.getUserInvestments(user.email).subscribe(investments=>{
          this.userInvestment = investments.success.Data;
          this.noOfPools.push(this.userInvestment.length);
          //this.alluserInvestment.push(this.userInvestment)
          console.log(this.noOfPools);
          //this.selectedInvestment = 0;
          //this.showDetails();
      })
    );
  }

  getUsers(){
    this.adminService.getUsers().subscribe(resp => {
        if (resp && resp.success) {
          this.users = resp.success.Data;
        }
  });
}

  // noPools(email){
  //     return this.userInvestment.length;
  // }


  // showDetails() {
  //   if (this.selectedInvestment >= 0) {
  //     console.log(this.userInvestment);
  //     this.investmentInfo = this.alluserInvestment[this.selectedInvestment];

  //     this.getUserDashBoard();
  //     this.selectedInvestment++;
  //     console.log(this.selectedInvestment);
  //     return this.selectedInvestment;
  //     } else {
  //     this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
  //     console.log(this.investmentInfo);
  //   }

  // }

  // getUserDashBoard() {
  //   console.log(this.user.email);
  //   const userEmail = this.user.email;
  //   const investmentId = this.investmentInfo.id;

  //   this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
  //     if (resp && resp.success) {
  //       this.dashBoardData = resp.success.Data;
  //       console.log(this.dashBoardData);
  //       this.dashboardInvestment.push(this.dashBoardData);
  //     } else {
  //       this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
  //       console.log(this.dashBoardData);
  //     }
  //     console.log(this.dashboardInvestment);
  //     this.showDetails();
  //   });
  // }

  goto(user: User): void {
    this.router.navigate([`/admin/userReport/${user.email}`]);
    console.log(user);

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
        }
        items.push(csvLine);
      });

      this.reportService.exportToCsv('myCsvDocumentName.csv', items);
    }
}
}
