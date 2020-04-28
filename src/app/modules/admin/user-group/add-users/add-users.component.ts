import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatOption } from '@angular/material';
import { Location } from '@angular/common';
import { AdminService } from '../../admin.service';


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

  constructor(private location: Location,
              private adminService: AdminService) {
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
