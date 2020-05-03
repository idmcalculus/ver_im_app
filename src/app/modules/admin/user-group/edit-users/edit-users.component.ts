import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatOption } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/user/user.service';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: EditUsersComponent },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'} }
  ]
})
export class EditUsersComponent implements OnInit {
  usergroups: any = [];
  email: string;
  isLoading: boolean;
  user: User;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private userService: UserService,
              private adminService: AdminService) {
              this.email = this.route.snapshot.paramMap.get('email');
              this.isLoading = true;
              this.userService.getProfileDetails(this.email).subscribe(userx => {
                this.user = userx.success.Data;
                this.isLoading = false;
              });
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

  goBack() {
    this.location.back();
  }

}
