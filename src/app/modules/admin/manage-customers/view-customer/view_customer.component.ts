import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { User } from 'src/app/shared/models/user';
import { SearchCustomerComponent } from 'src/app/modules/admin/manage-customers/search-customer/search_customer.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view_customer.component.html',
  styleUrls: ['./view_customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
    _shown = true;
    @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};

    constructor(
      private searchCustomer: SearchCustomerComponent,
      private userService: UserService,
      private toastrService: ToastrService
      ) { }

    ngOnInit() {
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

    deleteUser = (user) => {
        this.userService.deleteUser(user).subscribe(resp => {
          if (resp && resp.success) {
            // alert(resp.success.Message)
            // this.users[userIndex].email_is_verified=0
            this.toastrService.success('Details deleted succesfully');
          } else {
            this.toastrService.error('There was an issue deleting.. Try again later');
          }
        });
      }
  }
