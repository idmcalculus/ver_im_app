import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/Category';
import * as $ from 'jquery';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view_customer.component.html',
  styleUrls: ['./view_customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

    _shown = true;
    userData: any [];
    user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
    investments: Investment;
    dashBoardData: any = {number_of_pools: 0, investment: [], investment_return: [], investment_report: []};
    p: number = 1;
    p2: number =1;
    res: Category;
    userInvestment: any;
    FilteredInvestment: Investment[];
    dashboardInvestment: any = [];
    isLoading: boolean;
    categories=[];
    selectedInvestment = -1;
    investmentInfo: Investment = {duration: '0', investment_amount: 0};
    pageValue = 5;
    reports: any[] = [];

    constructor(
      private investmentService: InvestmentService,
      private userService: UserService,
      private toastrService: ToastrService,
      private router: Router,
      private route: ActivatedRoute
      ) {
        this.getCategories();
        this.isLoading = true;
       }

    ngOnInit() {
      this.user.email = this.route.snapshot.paramMap.get('email');
      this.userService.getProfileDetails(this.user.email).subscribe(resp => {
        if (resp && resp.success) {
        this.userData = resp.success.Data.user;
        this.user = this.userData[0];
        }
      });

      this.investmentService.getUserInvestments(this.user.email).subscribe(investments=>{
            if(investments.success.Data != 0){
              this.userInvestment = investments.success.Data;
              this.selectedInvestment = 0;
              this.showDetails();
              this.FilteredInvestment = this.userInvestment.filter((investment) => investment.is_investment_ended === 1);
            } else {
              this.isLoading = false;
            }
      });


    }

    //this is a quick fix for this feature, we will replace later
    @HostListener('click', ['$event']) function(event: KeyboardEvent) {
        var element = document.querySelector('#carousel-inner');
        var child = element.querySelector('.active')
        const val = Array.from(element.children).indexOf(child)
        let length = document.querySelectorAll('.investment-card').length;
        let index = length - (val+1);
        $('.investment-card').hide();
        let elements = document.getElementsByClassName('investment-card')[index] as HTMLInputElement;
        elements.style.display = 'block';

        $('#investmentTable').find('> tbody').hide();
        const row = $('#investmentTable').find('> tbody')[index] as HTMLInputElement;
        row.style.display = 'contents';
    }

    getCategories() {
        this.investmentService.getCategories().subscribe(resp => {
          if (resp && resp.success) {
            this.categories = resp.success.Data;
          }
        });
    }
    getCategoryName(id) {
        if (id) {
        this.res = this.categories.find(r => r.id === id);
        return this.res.category_name;
        } else {
          return this.res = {category_name: ''};
        }
    }

    showDetails() {
        if ( this.selectedInvestment <= (this.userInvestment.length - 1) ) {
            this.investmentInfo = this.userInvestment[this.selectedInvestment];
            this.getUserDashBoard();
            this.selectedInvestment++;
            return this.selectedInvestment;
            } else {
            this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
      }
    }

    getUserDashBoard() {
        const userEmail = this.user.email;
        const investmentId = this.investmentInfo.id;
        this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
          if (resp && resp.success) {
            this.dashBoardData = resp.success.Data;
            this.dashboardInvestment.push(this.dashBoardData);
            this.dashboardInvestment.forEach(investment => {
              investment.investment_report.forEach((report, i) => report.index = i + 1);
            });
            this.isLoading = false;

       /*     //this is a quick fix for this feature, we will replace later
            const control = document.getElementById('carousel-control');
            control.addEventListener('click',()=>{
              var element = document.querySelector('#carousel-inner');
              var child = element.querySelector('.active')
              const val = Array.from(element.children).indexOf(child)
              $('.investment-card').hide();
              let elements = document.getElementsByClassName('investment-card')[val] as HTMLInputElement;
              elements.style.display = 'block';

              $('#investmentTable').find('> tbody').hide();
              const row = $('#investmentTable').find('> tbody')[val] as HTMLInputElement;
              row.style.display = 'contents';
            })

            const control2 = document.getElementById('carousel-control2');
            control2.addEventListener('click',()=>{
              var element = document.querySelector('#carousel-inner');
              var child = element.querySelector('.active')
              const val = Array.from(element.children).indexOf(child)
              $('.investment-card').hide();
              let elements = document.getElementsByClassName('investment-card')[val] as HTMLInputElement;
              elements.style.display = 'block';

              $('#investmentTable').find('> tbody').hide();
              const row = $('#investmentTable').find('> tbody')[val] as HTMLInputElement;
              row.style.display = 'contents';
            }) */

          } else {
            this.dashBoardData = {number_of_pools: 0,investment: [], investment_return: [], investment_report: []};
          }
          this.isLoading = false;
          this.showDetails();

        });
    }

    updateUser(operation) {
        this.isLoading = true;
        if (operation === 'enable') {
         if(confirm('Are you sure you want to activate user')){
          this.userService.activateUser(this.user).subscribe(resp => {
            if (resp && resp.success) {
               this.toastrService.success('User activated succesfully');
               this.user.email_is_verified = 1;
            }
            this.isLoading = false;
          });
        }} else {
          if(confirm('Are you sure you want to deactivate user')){
          this.userService.deactivateUser(this.user).subscribe(resp => {
            if (resp && resp.success) {
               this.toastrService.success('User deactivated succesfully');
               this.user.email_is_verified = 0;
            }
            this.isLoading = false;
          });
        }}
    }

    cancelProfile() {
        this.user = null;
        this.router.navigateByUrl('admin/manage-users');
    }

    delete(users: User) {
      this.isLoading = true;
      if (confirm('Are you sure you want to delete user')){
        this.userService.deleteUser(users).subscribe(resp => {
          if (resp && resp.success) {
            this.toastrService.success('Details deleted succesfully');
          } else {
            this.toastrService.error('There was an issue deleting.. Try again later');
          }
          this.isLoading = false;
          this.router.navigateByUrl('admin/manage-users');
        });
      }
    }

    setItemsPerPage(event){
        this.pageValue = event;
    }

    calculateEstimate(returns, inv, expected_return_period) {
        const estimate = ((returns * this.divisorFunc(expected_return_period)) / inv) * 100;
        return Math.ceil(estimate);
    }

    divisorFunc(expected_return_period) {
        if ( expected_return_period === "Weekly") {
            return 48;
        } else if (expected_return_period === "Monthly") {
            return 12;
        }
    }

    getBalance (expected_return_period, expected_return) {
        if ( expected_return_period === "Weekly") {
            return 48 * expected_return ;
        } else if (expected_return_period === "Monthly") {
            return 12 * expected_return;
        }
    }

    addMonth(date: Date, inv) {
        const newDate = new Date(date);
        const d = newDate.getDate();
        const m = newDate.getMonth();
        if (inv) {
          return inv === 'Monthly' ? (
            newDate.setMonth(m + 1),
            newDate.getMonth() === 11 ? newDate.setDate(0) : newDate
          ) : (
            newDate.setDate(d + 7)
          );
        }
      }
}
