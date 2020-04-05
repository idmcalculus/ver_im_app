import { Component, Input,  OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/user/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
    @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
    @ViewChild('error') error;

    _shown = true;
    isSubmitting;
    isLoading = true;
    countries: string[] =  ['Abia','FCT Abuja','Adamawa','Akwa Ibom','Ananmbra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo',
                            'Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
                            'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe', 'Zamfara'];
    bankList: any = [];


    constructor(private userService: UserService,
        private toastrService: ToastrService,
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
  this.router.navigateByUrl('user/settings');
}

updateProfile(user: User) {
if (this.user.average_monthly_income === null) {
  this.user.average_monthly_income = '0';
}
this.isSubmitting = this.userService.updateProfile(this.user).subscribe(resp => {
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
this.isSubmitting = this.userService.updatePreference(this.user).subscribe(resp => {
      if (resp && resp.success) {
      this.toastrService.success('Details updated succesfully');
      } else {
          // alert('Update did not go through');
          this.toastrService.error('Details update failed');
          }
  });
  }

updateBankDetails(user: User) {
this.isSubmitting = this.userService.updateBankDetails(this.user).subscribe(resp => {
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

