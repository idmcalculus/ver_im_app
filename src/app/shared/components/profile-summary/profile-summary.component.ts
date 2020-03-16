import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { ManageUsersComponent } from 'src/app/modules/admin/manage-users//manage-users.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.css']
})
export class ProfileSummaryComponent implements OnInit {
  _shown = true;
  private toastrService: ToastrService;
  @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};

  constructor(
    private manageUser: ManageUsersComponent,
    ) { }

  ngOnInit() {
  }

  updateUser(status: string) {
    if (status) {
      this.manageUser.updateUser(this.user, 'enable');
      this.user.email_is_verified = 1;
    } else {
      this.manageUser.updateUser(this.user, 'disable');
      this.user.email_is_verified = 0;
    }

  }

  updateDetails(user) {
    if (user.average_monthly_income === null) {
      user.average_monthly_income = 0;
    }
    this.manageUser.updateDetails(user).subscribe(resp => {
      if (resp && resp.success) {
        this.toastrService.success('Details updated succesfully');
      }
    });
    this._shown = true;
  }
}
