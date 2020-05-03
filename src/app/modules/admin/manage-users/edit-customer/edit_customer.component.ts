import { Component,  OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('closebutton') closebutton;
  @ViewChild('closemodal') closemodal;
  @ViewChild('closetab') closetab;

  modalText = 'Save Changes';
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

cancelProfile() {
        this.user = null;
        this.router.navigateByUrl('admin/manage-users');
    }

updateProfile(user: User) {
    if (this.user.average_monthly_income === null) {
        this.user.average_monthly_income = '0';
    }
    this.modalText = 'Updating...';
    this.isSubmitting = this.userService.adminUpdateProfile(user).subscribe(resp => {
        if (resp && resp.success) {
        this.toastrService.success('Details updated succesfully');
        this.modalText = 'Save Changes';
        this.closebutton.nativeElement.click();
        }
      else {
        // alert('Update did not go through');
        this.toastrService.error('Details update failed');
        this.modalText = 'Save Changes';
        this.closebutton.nativeElement.click();
        }
    });
    }

updatePreference(user: User) {
    this.modalText = 'Updating...';

    this.isSubmitting = this.userService.adminUpdatePreference(user).subscribe(resp => {
            if (resp && resp.success) {
            this.toastrService.success('Details updated succesfully');
            this.modalText = 'Save Changes';
            this.closetab.nativeElement.click();
            } else {
                // alert('Update did not go through');
                this.toastrService.error('Details update failed');
                this.modalText = 'Save Changes';
                this.closetab.nativeElement.click();
                }
        });
        }

updateBankDetails(user: User) {
    this.modalText = 'Updating...';

    this.isSubmitting = this.userService.adminUpdateBankDetails(user).subscribe(resp => {
            if (resp && resp.success) {
            this.toastrService.success('Details updated succesfully');
            this.modalText = 'Save Changes';
            this.closemodal.nativeElement.click();
            } else {
                // alert('Update did not go through');
                this.toastrService.error('Details update failed');
                this.modalText = 'Save Changes';
                this.closemodal.nativeElement.click();
                }
        });
        }

getBankList() {
        this.userService.getBankList().subscribe(resp => {
            this.bankList = resp.success.Data;
        });
    }

}
