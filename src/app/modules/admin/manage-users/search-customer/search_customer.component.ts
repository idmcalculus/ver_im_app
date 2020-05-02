import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../admin.service';
import { UserService } from '../../../user/user.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './search_customer.component.html',
  styleUrls: ['./search_customer.component.scss']
})
export class SearchCustomerComponent implements OnInit {
  searchValue = '';
  emailValue = '';
  numberValue = '';
  users: User [];
  user: User = {email: ''};
  selectedDelUser: User;
  checkedUser = [];
  isLoading = true;
  selectedAll;
  constructor(
     private userService: UserService,
     private adminService: AdminService,
     private dynamicScrLoader: DynamicScriptLoaderService,
     private toastrService: ToastrService,
     private router: Router
     ) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.users = resp.success.Data;
        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');
        this.dynamicScrLoader.loadSingle('trigger-data-table');
      }
    });
  }

  selectAll() {
    for (let i = 0; i < this.users.length; i++) {
      {
        this.users[i].selected = this.selectedAll;
      }
    }
    this.getCheckedUser();
  }

  checkIfAllSelected() {
    this.selectedAll = this.users.every((user: User) => {
      return user.selected === true;
    });
    this.getCheckedUser();
  }

  getCheckedUser() {
    this.checkedUser = [];
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].selected) {
      this.checkedUser.push(this.users[i]);
      }
    }
  }

  deleteUserDetail(userIndex) {
    this.selectedDelUser = this.users[userIndex];
    return this.selectedDelUser;
  }


  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.users = resp.success.Data;
      }
      this.isLoading = false;
    });
  }

  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value;

    if (!value) {
      return this.getUsers();
    } else {
      const filtered = this.users.filter(user => {
          if (user[filterType] !== null) {
            const filterate = user[filterType].toString();
            return filterate.toLowerCase().includes(value.toLowerCase());
          }
        });
      this.users = filtered;
    }
  }

  clearSearch = () => {
    this.searchValue = null;
    this.emailValue = null;
    this.numberValue = null;
    return this.getUsers();
  }

  delete = () => {
    if(confirm('Are you sure you want to delete user')){
    this.userService.deleteUser(this.selectedDelUser).subscribe(resp => {
      if (resp && resp.success) {
       this.toastrService.success('Details deleted succesfully');
       this.getUsers();
     } else {
        this.toastrService.error('There was an issue deleting.. Try again later');
     }
    });
  }
 }

}
