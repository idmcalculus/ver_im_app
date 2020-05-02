import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view_customer.component.html',
  styleUrls: ['./view_customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
    _shown = true;
    userData: any [];
    user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
    investments: Investment;
    dashBoardData: any = {number_of_pools: 0, investment_return: [], investment_report: []};
    p: number = 1;
    p2: number =1;
    userInvestment: any;
    FilteredInvestment: Investment[];
    dashboardInvestment: any =[];
    isLoading: boolean;
   // categories=[];
    selectedInvestment = -1;
    investmentInfo: Investment = {duration: '0', investment_amount: 0};
    constructor(
      private investmentService: InvestmentService,
      private userService: UserService,
      private toastrService: ToastrService,
      private router: Router,
      private route: ActivatedRoute
      ) {
     //   this.getCategories();
        this.isLoading = false;
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
            if(investments.success.Data !== 0){
              this.userInvestment = investments.success.Data;
              this.selectedInvestment = 0;
              this.showDetails();
              this.FilteredInvestment = this.userInvestment.filter((investment : Investment) => investment.is_investment_ended === '0');
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
   /* getCategories() {
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
*/

    showDetails() {
        if ( this.selectedInvestment <= (this.userInvestment.length - 1) ) {
            this.investmentInfo = this.userInvestment[this.selectedInvestment];
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
            this.dashboardInvestment.push(this.dashBoardData);
          } else {
            this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
          }
          this.showDetails();
        });
      }

    updateUser(operation) {
        if (operation == 'enable') {
          this.userService.activateUser(this.user).subscribe(resp => {
            if(resp && resp.success) {
               this.toastrService.success('User activated succesfully');
               this.user.email_is_verified=1;
            }
          })
        }else{
          this.userService.deactivateUser(this.user).subscribe(resp=>{
            if(resp && resp.success){
               this.toastrService.success('User deactivated succesfully');
               this.user.email_is_verified=0;
            }
          });
        }

      }

      cancelProfile() {
        this.user = null;
        this.router.navigateByUrl('admin/manage-users');
    }

    delete (users: User) {
      if(confirm('Are you sure you want to delete user')){
        this.userService.deleteUser(users).subscribe(resp => {
          if (resp && resp.success) {
            this.toastrService.success('Details deleted succesfully');
          } else {
            this.toastrService.error('There was an issue deleting.. Try again later');
          }
          this.router.navigateByUrl('admin/manage-users');
        })
      }
    }
    calculateEstimate(returns, inv, expected_return_period) {
    const estimate = (((returns * this.divisorFunc(expected_return_period)) - inv) / inv) * 100;
    return Math.ceil(estimate);
    }

    divisorFunc (expected_return_period) {
    if ( expected_return_period === "Weekly") {
        return 48;
    } else if (expected_return_period === "Monthly") {
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
