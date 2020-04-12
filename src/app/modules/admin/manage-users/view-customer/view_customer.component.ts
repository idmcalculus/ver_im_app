import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view_customer.component.html',
  styleUrls: ['./view_customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
    _shown = true;
    @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
    investments: Investment;
    dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
    p: number = 1;
    p2: number =1;
    userInvestment: any;
    FilteredInvestment: Investment[];
    dashboardInvestment: any =[];
    isLoading: boolean;
    categories=[];
    selectedInvestment = -1;
    investmentInfo: Investment = {duration: '0', investment_amount: 0};
    constructor(
      private investmentService: InvestmentService,
      private userService: UserService,
      private toastrService: ToastrService,
      private router: Router,
      private location: Location
      ) {
        this.getCategories();
        this.isLoading = false;
       }

    ngOnInit() {
        this.investmentService.getUserInvestments(this.user.email).subscribe(investments=>{
            if(investments.success.Data !== 0){
              this.userInvestment = investments.success.Data;
              console.log(this.userInvestment);
              this.selectedInvestment = 0;
              this.showDetails();
              this.FilteredInvestment = this.userInvestment.filter((investment : Investment) => investment.is_investment_ended === '1');
            }
            else {
                this.isLoading = true;
            }

          });



        $('#myCarousel').on('slide.bs.carousel', function (e:any) {
        const to = e.to;
        $('.investment-card').hide();
        let element = document.getElementsByClassName('investment-card')[Number(to)] as HTMLInputElement;
        element.style.display = 'block';

        $('#investmentTable').find('> tbody').hide();
        const row = $('#investmentTable').find('> tbody')[Number(to)] as HTMLInputElement;
        row.style.display = 'contents';
        })

    }

    getCategories() {
        this.investmentService.getCategories().subscribe(resp => {
          if (resp && resp.success) {
            this.categories = resp.success.Data;
          }
        });
      }

      getCategoryName(id){
        const res = this.categories.find( r=> r.id == 21);
        return res.category_name;
      }


    showDetails() {
        if ( this.selectedInvestment <= (this.userInvestment.length - 1) ) {
            this.investmentInfo = this.userInvestment[this.selectedInvestment];
            console.log(this.investmentInfo);
            this.getUserDashBoard();
            this.selectedInvestment++;
            return this.selectedInvestment;
            } else {
            this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
            this.isLoading = true;
            }
      }

      getUserDashBoard() {
        const userEmail = this.user.email;
        const investmentId = this.investmentInfo.id;

        this.userService.getUserDashBoard(investmentId, userEmail).subscribe(resp => {
          if (resp && resp.success) {
            this.dashBoardData = resp.success.Data;
            console.log(this.dashBoardData);
            this.dashboardInvestment.push(this.dashBoardData);
          } else {
            this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
          }
          console.log(this.dashboardInvestment);
          this.showDetails();
        });
      }

    Back(){
        this.location.back();
    }


    updateUser(user, operation) {
        if (operation == 'enable') {
          this.userService.activateUser(user).subscribe(resp => {
            if (resp && resp.success) {
              // alert(resp.success.Message)
              // this.users[userIndex].email_is_verified=1
            }
          })
        }else{
          this.userService.deactivateUser(user).subscribe(resp=>{
            if(resp && resp.success){
              // alert(resp.success.Message)
              // this.users[userIndex].email_is_verified=0
            }
          });
        }

      }




    delete (users: User) {
        this.userService.deleteUser(users).subscribe(resp => {
          if (resp && resp.success) {
            this.toastrService.success('Details deleted succesfully');
          } else {
            this.toastrService.error('There was an issue deleting.. Try again later');
          }
          this.router.navigateByUrl('admin/manage-users');
        })
      }

      calculateEstimate(returns, inv, expected_return_period, i) {
        const estimate = (((returns * this.divisorFunc(expected_return_period, i)) - inv) / inv) * 100;
        return Math.ceil(estimate);
      }

      divisorFunc (expected_return_period, i) {
        if (this.userInvestment[i].expected_return_period === "Weekly") {
          return 48;
        } else if (this.userInvestment[i].expected_return_period === "Monthly") {
          return 12;
        }
      };
      addMonth(date: Date, month: number) {
        const newDate = new Date(date);
        const d = newDate.getDate();
        newDate.setMonth(newDate.getMonth() + month);
        if (newDate.getMonth() == 11) {
            newDate.setDate(0);
        }
        return newDate;
    }
  }
