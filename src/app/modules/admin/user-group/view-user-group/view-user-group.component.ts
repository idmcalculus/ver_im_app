import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-view-user-group',
  templateUrl: './view-user-group.component.html',
  styleUrls: ['./view-user-group.component.scss']
})
export class ViewUserGroupComponent implements OnInit {
  usergroups: any = [];
  isLoading: boolean;
  selectedAll;
  checkedUser = [];

  constructor(private adminService: AdminService) {
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

  selectAll() {
    this.usergroups.forEach(usergroup => {
      usergroup.selected = this.selectedAll;
    });
    // this.getCheckedUser();
  }

  checkIfAllSelected() {
    this.selectedAll = this.usergroups.every(user => {
      return user.selected === true;
    });
    // this.getCheckedUser();
  }

  deleteSelected() {
    const filtered = this.usergroups.filter(user => user.selected === false);
    filtered.forEach((user, i) => user.index = i + 1 );
    this.usergroups = filtered;
}

  /*getCheckedUser() {
    this.checkedUser = [];
    this.usergroups.forEach(usergroup => {
      if (usergroup.selected) {
        this.checkedUser.push(usergroup);
      }
    });
  }*/

}
