import { Component, Input,  OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { User } from 'src/app/shared/models/user';
import { SearchCustomerComponent } from 'src/app/modules/admin/manage-users/search-customer/search_customer.component';
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
  countries: string[] =  ['Abia','FCT Abuja','Adamawa','Akwa Ibom','Ananmbra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo',
                          'Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
                          'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe', 'Zamfara'];
  bankList: any = [];
  passText = '';
  confirmPassText = '';
  opt1selected = false;
  opt2selected = false;

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

// Make additional tab buttons
TabControl(){
    var i, items = $('.nav-link'), pane = $('.tab-pane');
    // next
    $('.next').on('click',function(){
        for(i = 0; i < items.length; i++){
            if($(items[i]).hasClass('active') ==true){
                break;
            }
        }
        if(i < items.length - 1){
            // for tab
            $(items[i]).removeClass('active');
            $(items[i+1]).addClass('active');
            // for pane
            $(pane[i]).removeClass('show active');
            $(pane[i+1]).addClass('show active');
        }
    });
}

cancelProfile() {
        this.isSubmitting = false;
        this.router.navigateByUrl('admin/manage-customers');
    }

updateProfile(user: User) {
    if (this.user.average_monthly_income === null) {
        this.user.average_monthly_income = '0';
    }
    this.isSubmitting = this.userService.adminUpdateProfile(this.user).subscribe(resp => {
        if (resp && resp.success) {
        this.toastrService.success('Details updated succesfully');
        }
      else {
        // alert('Update did not go through');
        this.toastrService.error('Details update failed');
        }
    });
    }

updatePreference(user: User) {
    this.isSubmitting = this.userService.adminUpdatePreference(this.user).subscribe(resp => {
            if (resp && resp.success) {
            this.toastrService.success('Details updated succesfully');
            } else {
                // alert('Update did not go through');
                this.toastrService.error('Details update failed');
                }
        });
        }

updateBankDetails(user: User) {
    this.isSubmitting = this.userService.adminUpdateBankDetails(this.user).subscribe(resp => {
            if (resp && resp.success) {
            this.toastrService.success('Details updated succesfully');
            } else {
                // alert('Update did not go through');
                this.toastrService.error('Details update failed');
                }
   });
        }

validate() {
        this.input.nativeElement.style.borderColor = '#ccc';
        this.input2.nativeElement.style.borderColor = '#ccc';
        this.error.nativeElement.style.display = 'none';
        }

changePassword(): void {
        if (this.passText === '') {
            this.input.nativeElement.style.borderColor = 'red';
            this.error.nativeElement.style.display = 'block';
        }
        if (this.confirmPassText === '') {
            this.input2.nativeElement.style.borderColor = 'red';
            this.error.nativeElement.style.display = 'block';
        }
        if (this.passText && this.confirmPassText !== '') {
            if (this.passText === this.confirmPassText) {
            this.isSubmitting = this.userService.changePassword(this.passText).subscribe(resp => {
                if (resp && resp.success) {
                this.toastrService.success('Password updated succesfully');
                this.passText = '';
                this.confirmPassText = '';
                localStorage.setItem('token', resp.success.Token);
                }
            });
            console.log(this.passText);
            } else {
            // alert('Passwords do not match');
            this.toastrService.error('Passwords do not match');
            }
            this.error.nativeElement.style.display = 'none';
        }
    }

getBankList() {
        this.userService.getBankList().subscribe(resp => {
            this.bankList = resp.success.Data;
        });
    }

}
