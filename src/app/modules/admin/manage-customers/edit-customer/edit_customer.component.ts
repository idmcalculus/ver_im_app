import { Component, Input,  OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { SearchCustomerComponent } from 'src/app/modules/admin/manage-customers/search-customer/search_customer.component';
import { UserService } from 'src/app/modules/user/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit_customer.component.html',
  styleUrls: ['./edit_customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  @Input() public editable: boolean;
  @ViewChild('pass') input;
  @ViewChild('confirmPass') input2;
  @ViewChild('error') error;

  _shown = true;
  isSubmitting;
  isLoading = true;
  countries: string[] = ['Nigeria', 'Ghana'];
  bankList: any = [];
  tabProps = {};

  constructor(private userService: UserService,
              private toastrService: ToastrService,
              private searchCustomer: SearchCustomerComponent,
              private router: Router
   ) {
      this.getBankList();
   }

ngOnInit() {
    this.isLoading = false;
     }


cancelProfile() {
        this.isSubmitting = false;
        this.router.navigateByUrl('admin/manage-customers');
    }

updateDetails(user: any) {
    if (this.user.average_monthly_income === null) {
        this.user.average_monthly_income = '0';
    }
    this.userService.adminUpdateCustomerDetails(this.user).subscribe(resp => {
        if (resp && resp.success) {
        this.toastrService.success('Details updated succesfully');
        }
    });
    this.router.navigateByUrl('admin/manage-customers');
    }
getBankList() {
    this.userService.getBankList().subscribe(resp => {
        this.bankList = resp.success.Data;
    });
    }
toggleTab(tabname: string) {
        switch (tabname) {
        default:
            this.tabProps = {profileShow : true};
            break;
        case 'bank':
            this.tabProps = {bankShow : true};
            break;
        case 'settings':
            this.tabProps = {settingsShow : true};
            break;
        }
    }
}
