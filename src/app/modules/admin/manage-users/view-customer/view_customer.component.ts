import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { UserDashboard } from 'src/app/shared/models/UserDashboard';
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
    userInvestment: Investment[];
    FilteredInvestment: Investment[];
    dashboardInvestment: any =[];
    isLoading: boolean;
    selectedInvestment = -1;
    investmentInfo: Investment = {duration: '0', investment_amount: 0};
    constructor(
      private investmentService: InvestmentService,
      private userService: UserService,
      private toastrService: ToastrService,
      private router: Router,
      private location: Location
      ) { }

    ngOnInit() {
        this.investmentService.getUserInvestments(this.user.email).subscribe(investments=>{
            if(investments.success.Data !== 0){
              this.userInvestment = investments.success.Data;
              console.log(this.userInvestment);
              this.selectedInvestment = 0;
              this.showDetails();
              this.FilteredInvestment = this.userInvestment.filter((investment : Investment) => investment.is_investment_ended === 1);
            }
        this.isLoading = false;
          });


        $('#myCarousel').on('slide.bs.carousel', function (e) {
        const to = e.to;
        $('.investment-card').hide();
        let element = document.getElementsByClassName('investment-card')[Number(to)] as HTMLInputElement;
        element.style.display = 'block';

        $('#investmentTable').find('> tbody').hide();
        const row = $('#investmentTable').find('> tbody')[Number(to)] as HTMLInputElement;
        row.style.display = 'contents';
        })

    }

    showDetails() {
        if ( this.selectedInvestment <= (this.userInvestment.length - 1) ) {
            this.investmentInfo = this.userInvestment[this.selectedInvestment];
            console.log(this.investmentInfo);
            this.getUserDashBoard();
            this.selectedInvestment++;
            console.log(this.selectedInvestment);
            return this.selectedInvestment;
            } else {
            this.dashBoardData = {number_of_pools: 0, investment_return: [], investment_report: []};
            console.log(this.investmentInfo);
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
            console.log(this.dashBoardData);
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
        this.userService.deleteUser(this.user).subscribe(resp => {
          if (resp && resp.success) {
            this.toastrService.success('Details deleted succesfully');
          } else {
            this.toastrService.error('There was an issue deleting.. Try again later');
          }
          this.router.navigateByUrl('admin/manage-users');
        })
      }
  }
