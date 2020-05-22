import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../admin.service';
import { UserService } from '../../../user/user.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import { ToastrService } from 'ngx-toastr';
import { FilterTablesPipe } from 'src/app/filter-tables.pipe';

@Component({
  selector: 'app-manage-users',
  templateUrl: './search_customer.component.html',
  styleUrls: ['./search_customer.component.scss']
})
export class SearchCustomerComponent implements OnInit {
  pageValue = 5;
  users: User [];
  user: User = {email: ''};
  filteredUser: User [];
  data: User [];
  selectedDelUser: User;
  checkedUser = [];
  isLoading = true;
  selectedAll;
  p2 = 1;
  order = "last_name";
  ascending = true;

  constructor(
     private userService: UserService,
     private adminService: AdminService,
     private dynamicScrLoader: DynamicScriptLoaderService,
     private toastrService: ToastrService,
     private filterby: FilterTablesPipe
     ) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.data = resp.success.Data;
        this.users = this.filterby.transform(this.data, this.order, this.ascending);
        this.filteredUser = this.users;
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

  setItemsPerPage(event){
      this.pageValue = event;
  }

  deleteUserDetail(userIndex) {
    this.selectedDelUser = this.users[userIndex];
    return this.selectedDelUser;
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.data = resp.success.Data;
        this.users = this.filterby.transform(this.data, this.order, this.ascending);
      }
      this.isLoading = false;
    });
  }

  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value.toString().toLowerCase();
    const filtered = this.filteredUser.filter(user => {
      if (user[filterType] !== null) {
        const filterate = user[filterType].toString().toLowerCase();
        if (filterate.indexOf(value) >= 0) {
          return user;
        }
      }
    });
    this.users = filtered;
  }

  filterTable1(filterType1, filterType2, filterValue): any {
    const value = filterValue.target.value.toString().toLowerCase();
    const filtered = this.filteredUser.filter(user => {
      if (user[filterType1] !== null && user[filterType2] !== null) {
        const filterate1 = user[filterType1].toString().toLowerCase();
        const filterate2 = user[filterType2].toString().toLowerCase();
        if (filterate1.indexOf(value) >= 0 || filterate2.indexOf(value) >= 0) {
          return user;
        }
      }
    });
    this.users = filtered;
  }

  delete = () => {
    if (confirm('Are you sure you want to delete user')) {
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
