import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
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
    p: number = 1;
    userInvestment: Investment[];
    FilteredInvestment: Investment[];
    isLoading: boolean;
    constructor(
      private investmentService: InvestmentService,
      private userService: UserService,
      private toastrService: ToastrService,
      private location: Location
      ) { }

    ngOnInit() {
        this.investmentService.getUserInvestments(this.user.email).subscribe(investments=>{
            if(investments){
              this.userInvestment = investments.success.Data
              this.FilteredInvestment = this.userInvestment.filter((investment : Investment) => investment.investment_amount == 50000);
            }
            this.isLoading = false;
          })

          $('#myCarousel').on('slide.bs.carousel', function (e) {
            const to = e.to;
            $('.investment-card').hide();
            let element = document.getElementsByClassName('investment-card')[Number(to)] as HTMLInputElement;
            element.style.display = 'block';

            $('#investmentTable').find('> tbody > tr').hide();
            const row = $('#investmentTable').find('> tbody > tr')[Number(to)] as HTMLInputElement;
            row.style.display = 'block';
          })

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

    delete (user: User) {
        this.userService.deleteUser(this.user).subscribe(resp => {
          if (resp && resp.success) {
            this.toastrService.success('Details deleted succesfully');
          } else {
            this.toastrService.error('There was an issue deleting.. Try again later');
          }
        })
      }
  }
