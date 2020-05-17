import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../admin/admin.service';
import { InvestmentService } from '../../investment/investment.service';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { FilterTablesPipe } from 'src/app/filter-tables.pipe';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  @Input() public overiddenUser: User;
  modalText = 'Withdraw';
  allDashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
  dashboardInvestment: any = [];
  userActivity: any = [];
  usersInvestments: any;
  usersInvestment: any = [];
  pools: any = [];
  poolGroup: any = [];
  filteredYearData: Investment[] = [];
  filteredDayData: Investment[] = [];
  filteredMonthData: Investment[] = [];
  isLoading = true;
  p2: number = 1;
  selectedInvestment = -1;
  investmentInfo: Investment = {duration: '0', investment_amount: 0};
  isGraphShown = false;
  lineChartData: any;
  lineChartLabels: any;
  latest_return = 0;
  totalYieldedAmount = 0;
  order = 'num_of_pools_taken';
  ascending = false;
  investmentIds: string;
  idArray: any[];
  UserBank = 'Wema Bank';
  UserAccount = null;
  UserAccountName = null;
  Validated = false;
  activateBtn = false;
  amountToWithdraw = 0 ;
  submittedWithdraw = false;
  groupInvestments: any[] = [];
  isSubmitting;

  constructor(private userService: UserService,
              private adminService: AdminService,
              private investmentService: InvestmentService,
              private filterby: FilterTablesPipe,
              private authService: AppAuthService) {}

  ngOnInit() {

    this.isLoading = true;
    this.authService.currentUser.subscribe(resp => {

        if (resp) {
          this.overiddenUser = resp;
          this.userService.getusersInvestment(resp.email).subscribe(res => {
              if (res && res.success) {
              this.usersInvestment = res.success.Data;
              this.usersInvestments = this.usersInvestment.filter(res => res.is_investment_started === 1);
              this.selectedInvestment = 0;
              this.showDetails();
              }
              this.isLoading = false;
            });
          this.UserBank = resp.bank_name;
          this.UserAccount = resp.account_number;
          this.UserAccountName = resp.account_number;
        }
    });

    this.adminService.getDashBoardData().subscribe(resp => {
        if (resp && resp.success) {
          this.allDashBoardData = resp.success.Data;
          this.userActivity = this.allDashBoardData.fetch_activities.filter(res => res.email === this.overiddenUser.email);
        }
        this.isLoading = false;
      });

    this.investmentService.getInvestments(false).subscribe(investments => {
        if (investments) {
            this.pools = investments.success.Data;
            this.poolGroup = this.filterby.transform(this.pools, this.order, this.ascending);

            const seventhDay = new Date();
            seventhDay.setDate(seventhDay.getDate() - 7);
            this.filteredDayData = this.poolGroup.filter(d => {
              return new Date(d.created_at.split(' ')[0]).getTime() >= seventhDay.getTime();
            });

            const Month = new Date();
            Month.setDate(Month.getDate() - 31);
            this.filteredMonthData = this.poolGroup.filter((d) => {
            return new Date(d.created_at.split(' ')[0]).getTime() >= Month.getTime();
            });

            const Year = new Date();
            Year.setDate(Year.getDate() - 365);
            this.filteredYearData = this.poolGroup.filter((d) => {
            return new Date(d.created_at.split(' ')[0]).getTime() >= Year.getTime();
            });

      } else {
           console.log('No groups yet');
      }
        this.isLoading = false;
    });

    this.investmentService.getInvestmentGroup({group_name: 'Featured Investments'}).subscribe(async resp => {
      if (resp && resp.success) {
        const groups = await resp.success.Data;
        this.investmentIds = groups[groups.length - 1].investment_id;
        this.idArray = this.investmentIds.split(',');
        this.idArray.forEach(async id => {
          const foundInvestment = await this.pools.find(investment => investment.id === Number(id));
          this.groupInvestments.push(foundInvestment);
        });
      }
      this.isLoading = false;
    });
  }

  showDetails() {
    if ( this.selectedInvestment <= this.usersInvestments.length ) {
        this.investmentInfo = this.usersInvestments[this.selectedInvestment];
        this.getUserDashBoard();
        this.selectedInvestment++;
        return this.selectedInvestment;
    } else {
        this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
      }
  }

  getUserDashBoard() {
<<<<<<< HEAD
    const userEmail = this.overiddenUser.email;
    const investmentId = this.investmentInfo.id;

    this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
        if (resp && resp.success) {
          this.dashBoardData = resp.success.Data;
          this.dashboardInvestment.push(this.dashBoardData)
          let total=0;

          this.dashBoardData.investment_report.forEach(
                inv=> total+=inv.returned_amount
              )
          this.totalYieldedAmount=total;
          this.amountToWithdraw=total;
          console.log('total',this.amountToWithdraw,this.dashBoardData)
        } else {
          this.dashBoardData = {number_of_pools: 0,investment: [], investment_return: [], investment_report: []};
        }
        this.showDetails();
        this.isLoading = false;
    });

=======
    if (this.investmentInfo) {
      const userEmail = this.overiddenUser.email;
      const investmentId = this.investmentInfo.id;
      this.isLoading = true;
      this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
          if (resp && resp.success) {
            this.dashBoardData = resp.success.Data;
            this.dashboardInvestment.push(this.dashBoardData);
            let total = 0;

            this.dashBoardData.investment_report.forEach(
                  inv => total += inv.returned_amount
                );
            this.totalYieldedAmount = total;
            this.amountToWithdraw = total;
            console.log('total', this.amountToWithdraw, this.dashBoardData);
          } else {
            this.dashBoardData = {number_of_pools: 0, investment: [], investment_return: [], investment_report: []};
          }
          this.showDetails();
          this.isLoading = false;
      });
    }
>>>>>>> db1f90159c1be24eb577274aa3a2335d21064cac
  }

  calculateEstimate(returns, inv, expected_return_period) {
    const estimate = ((returns * this.divisorFunc(expected_return_period)) / inv) * 100;
    return Math.ceil(estimate);
  }

  validateWithdraw() {
    if (this.amountToWithdraw > this.totalYieldedAmount || this.amountToWithdraw <= 0) {
      this.activateBtn = false;
    } else {
      this.activateBtn = true;
      this.Validated = true;
    }
  }

  async withdraw() {
    const userEmail = this.overiddenUser.email;
    const name = this.overiddenUser.first_name;
    this.modalText = 'processing';
    await this.userService.withdraw(name, userEmail).subscribe(res => {
      this.modalText = 'processing';
      if (res.success.StatusCode === 200) {
        this.submittedWithdraw = true;
        this.amountToWithdraw = 0 ;
      }
    });
    this.modalText = 'Withdraw';
  }

  divisorFunc(expected_return_period) {
    if ( expected_return_period === 'Weekly') {
        return 48;
    } else if (expected_return_period === 'Monthly') {
        return 12;
    }
  }

 calculateReturn(expected_return_amount, expected_return_period) {
    if ( expected_return_period === 'Monthly') {
        return expected_return_amount;
    } else   {
        return expected_return_amount * 4;
    }
  }

  addMonth(date: Date, inv) {
    const newDate = new Date(date);
    const d = newDate.getDate();
    const m = newDate.getMonth();
    if (inv) {
      return inv.expected_return_period === 'Monthly' ? (
        newDate.setMonth(m + 1),
        newDate.getMonth() === 11 ? newDate.setDate(0) : newDate
      ) : (
        newDate.setDate(d + 7)
      );
    }
  }

  closeModal() {
    this.submittedWithdraw = false;
    this.Validated = false;
    this.amountToWithdraw = 0;
  }

  getTimeAgo(time) {
    TimeAgo.addLocale(en);
    let date = new Date(time);
    let hours = date.getHours();

    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(date);
  }
<<<<<<< HEAD



=======
>>>>>>> db1f90159c1be24eb577274aa3a2335d21064cac
}
