import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatOption } from '@angular/material';
import { Location } from '@angular/common';
import { AdminService } from '../../admin.service';
import { SignUpService } from 'src/app/shared/components/sign-up/sign-up.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AddUsersComponent },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'} }
  ]
})
export class AddUsersComponent implements OnInit {
  usergroups: any = [];
  isLoading: boolean;
  email: '';
  lastName: '';
  firstName: '';
  selectedUserGroup: '';
  password: '';
  userName: '';

  constructor(private location: Location,
              private adminService: AdminService,
              private signupService: SignUpService,
              private toastrService: ToastrService) {
                this.getUserGroups();
              }

  ngOnInit() {
  }

  getUserGroups() {
    this.isLoading = true;
    this.adminService.getUserCategories().subscribe(groups => {
      if (groups && groups.success) {
        groups.success.Categories.forEach(each => {
          return this.usergroups.push({value: each, selected: false});
        });
      }
      this.isLoading = false;
    });
  }

  /*email=${userCreds.email}&authentication_type=${userCreds.authentication_type}
    &password=${userCreds.password}&first_name=${userCreds.first_name}&last_name=${userCreds.last_name}
    &user_category=${userCreds.user_category}*/

  createAdmin() {
    const data = {
      email: this.email,
      authentication_type: 'E',
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName,
      user_category: this.selectedUserGroup,
      username: this.userName
    };
    this.signupService.register(data).subscribe(resp => {
      if (resp && resp.success) {
        this.toastrService.success('Admin User created successfully');
      } else {
        this.toastrService.error('There is an issue creating the Admin User');
      }
    });

  }

  goBack() {
    this.location.back();
  }

}
