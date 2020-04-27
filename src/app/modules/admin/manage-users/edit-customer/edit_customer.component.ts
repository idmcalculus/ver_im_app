import { Component,  OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/user/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit_customer.component.html',
  styleUrls: ['./edit_customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  userData: any[];
  _shown = true;
  isSubmitting;
  isLoading: boolean;
  countries: string[] =  ['Abia','FCT Abuja','Adamawa','Akwa Ibom','Ananmbra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo',
                          'Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
                          'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe', 'Zamfara'];
  bankList: any = [];

  constructor(private userService: UserService,
              private toastrService: ToastrService,
              private router: Router,
              private route: ActivatedRoute
   ) {
      this.getBankList();
      this.isLoading = false;
   }

ngOnInit() {
    this.user.email = this.route.snapshot.paramMap.get('email');
    this.userService.getProfileDetails(this.user.email).subscribe(resp => {
        if (resp && resp.success) {
        this.userData = resp.success.Data.user;
        this.user = this.userData[0];

        }
        this.isLoading = true;
    });
    }


// Make additional tab buttons
TabControl(){
    let i;
    const items = document.querySelectorAll('.nav-link');
    const pane = document.querySelectorAll('.tab-pane');
    for(i = 0; i < items.length; i++){
        if((items[i]).classList.contains('active') ==true){
            break;
        }
    }
    if(i < items.length - 1){
        // for tab
        (items[i]).classList.remove('active');
        (items[i+1]).classList.add('active');
        // for pane
        (pane[i]).classList.remove('show', 'active');
        (pane[i+1]).classList.add('show', 'active');
    }
}
cancelProfile() {
        this.user = null;
        this.router.navigateByUrl('admin/manage-users');
    }

updateProfile(user: User) {
    if (this.user.average_monthly_income === null) {
        this.user.average_monthly_income = '0';
    }
    this.isSubmitting = this.userService.adminUpdateProfile(user).subscribe(resp => {
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
    console.log(user);
    this.isSubmitting = this.userService.adminUpdatePreference(user).subscribe(resp => {
            if (resp && resp.success) {
            this.toastrService.success('Details updated succesfully');
            } else {
                // alert('Update did not go through');
                this.toastrService.error('Details update failed');
                }
        });
        }

updateBankDetails(user: User) {
    this.isSubmitting = this.userService.adminUpdateBankDetails(user).subscribe(resp => {
            if (resp && resp.success) {
            this.toastrService.success('Details updated succesfully');
            } else {
                // alert('Update did not go through');
                this.toastrService.error('Details update failed');
                }
   });
        }

getBankList() {
        this.userService.getBankList().subscribe(resp => {
            this.bankList = resp.success.Data;
        });
    }

}
