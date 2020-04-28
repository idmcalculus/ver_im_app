import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatOption } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user-group',
  templateUrl: './add-user-group.component.html',
  styleUrls: ['./add-user-group.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AddUserGroupComponent },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'}}
  ]
})
export class AddUserGroupComponent implements OnInit {
  accessPermissionsForm: FormGroup;
  modifyPermissionsForm: FormGroup;
  permissions = ['Dashboard/Users', 'Dashboard/Loan Repayment', 'Dashboard/Loan Requests', 'Dashboard/Charts', 'Dashboard/Activity'];
  modifyPermissions = new FormControl();
  accessPermissions = new FormControl();
  selectedAccessPermissions: any;
  selectedModPermissions: any ;

  @ViewChild('allSelectedA') private allSelectedA: MatOption;
  @ViewChild('allSelectedM') private allSelectedM: MatOption;

  constructor(private location: Location,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.accessPermissionsForm = this.fb.group({
      accessPermissions: new FormControl('')
    });
    this.modifyPermissionsForm = this.fb.group({
      modifyPermissions: new FormControl('')
    });
  }

  tosslePerOne(all) {
    if (this.allSelectedA.selected) {
     this.allSelectedA.deselect();
     return false;
 }
    if (this.accessPermissionsForm.controls.accessPermissions.value.length === this.permissions.length) {
     this.allSelectedA.select();
   }
 }

 togglePerOne(all) {
  if (this.allSelectedM.selected) {
   this.allSelectedM.deselect();
   return false;
}
  if (this.modifyPermissionsForm.controls.modifyPermissions.value.length === this.permissions.length) {
   this.allSelectedM.select();
 }
}

  toggleAccess() {
    if (this.allSelectedA.selected) {
      this.accessPermissionsForm.controls.accessPermissions
        .patchValue([...this.permissions.map(item => item), 0]);
    } else {
      this.accessPermissionsForm.controls.accessPermissions.patchValue([]);
    }
  }

  toggleModify() {
    if (this.allSelectedM.selected) {
      this.modifyPermissionsForm.controls.modifyPermissions
        .patchValue([...this.permissions.map(item => item), 0]);
    } else {
      this.modifyPermissionsForm.controls.modifyPermissions.patchValue([]);
    }
  }

  goBack() {
    this.location.back();
  }

}
