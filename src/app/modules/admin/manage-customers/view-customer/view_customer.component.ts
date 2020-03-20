import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { User } from 'src/app/shared/models/user';
import { SearchCustomerComponent } from 'src/app/modules/admin/manage-customers/search-customer/search_customer.component';
import { ToastrService } from 'ngx-toastr';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from 'src/app/modules/investment/investment.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view_customer.component.html',
  styleUrls: ['./view_customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
    _shown = true;
    @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
    investment: Investment;
    p: number = 1;
    userInvestment: Investment[];
    constructor(
      private searchCustomer: SearchCustomerComponent,
      private investmentService: InvestmentService,
      private userService: UserService,
      private toastrService: ToastrService
      ) { }

    ngOnInit() {
        this.investmentService.getUserInvestments(this.user.email).subscribe(investments=>{
            if(investments){
              this.userInvestment = investments.success.Data
              console.log(this.userInvestment);
            }
            this.isLoading=false;
          })
    }


    updateUser(status: string) {
      if (status) {
        this.searchCustomer.updateUser(this.user, 'enable');
        this.user.email_is_verified = 1;
      } else {
        this.searchCustomer.updateUser(this.user, 'disable');
        this.user.email_is_verified = 0;
      }

    }

    delete (user: User) {
        this.userService.deleteUser(this.user).subscribe(resp => {
          if (resp && resp.success) {
            this.toastrService.success('Details deleted succesfully');
          } else {
            this.toastrService.error('There was an issue deleting.. Try again later');
          }
        });
      }
    }
