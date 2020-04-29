import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatOption } from '@angular/material';
import { Location } from '@angular/common';

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
  usergroups = ['Super Admin', 'Admin', 'User'];

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
