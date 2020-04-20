import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-user-group',
  templateUrl: './view-user-group.component.html',
  styleUrls: ['./view-user-group.component.scss']
})
export class ViewUserGroupComponent implements OnInit {
  usergroups = [{value: 'Super Admin', selected: false}, {value: 'Admin', selected: false}, {value: 'User', selected: false}];
  selectedAll;
  checkedUser = [];

  constructor() { }

  ngOnInit() {
  }

  selectAll() {
    for (let i = 0; i < this.usergroups.length; i++) {
      {
        this.usergroups[i].selected = this.selectedAll;
      }
    }
    this.getCheckedUser();
  }

  checkIfAllSelected() {
    this.selectedAll = this.usergroups.every(user => {
      return user.selected === true;
    });
    this.getCheckedUser();
  }

  getCheckedUser() {
    this.checkedUser = [];
    for (let i = 0; i < this.usergroups.length; i++) {
      if (this.usergroups[i].selected) {
      this.checkedUser.push(this.usergroups[i]);
      }
    }
  }

}
