import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../admin.service';
import { UserService } from '../../../user/user.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-users',
  templateUrl: './search_customer.component.html',
  styleUrls: ['./search_customer.component.scss']
})
export class SearchCustomerComponent implements OnInit {
  searchValue = '';
  users: User [];
  user: User = {email: ''};
  selectedUser: User;
  selectedEditUser: User;
  selectedDelUser: User;
  checkedUser = [];
  isLoading= true;
  selectedAll;
  constructor(
     private userService: UserService,
     private adminService: AdminService,
     private dynamicScrLoader: DynamicScriptLoaderService,
     private toastrService: ToastrService
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
    this.selectedAll = this.users.every(function(user: User) {
      return user.selected == true;
    })
    this.getCheckedUser();
  }

  getCheckedUser(){
    this.checkedUser = [];
    for (var i = 0; i < this.users.length; i++) {
      if(this.users[i].selected)
      this.checkedUser.push(this.users[i]);
    }
  }

  viewUserDetail(userIndex) {
    this.selectedUser = this.users[userIndex];
  }

  editUserDetail(userIndex) {
    this.selectedEditUser = this.users[userIndex];
  }

  deleteUserDetail(userIndex) {
    this.selectedDelUser = this.users[userIndex];
    return this.selectedDelUser;
  }

  updateUser(user, operation) {
    if (operation == 'enable') {
      this.userService.activateUser(user).subscribe(resp => {
        if (resp && resp.success) {
          // alert(resp.success.Message)
          // this.users[userIndex].email_is_verified=1
        }
      })
    }else{
      this.userService.deactivateUser(user).subscribe(resp=>{
        if(resp && resp.success){
          // alert(resp.success.Message)
          // this.users[userIndex].email_is_verified=0
        }
      });
    }

  }

  updateDetails(user): any {
    this.userService.adminUpdateProfile(user).subscribe(resp => {
      if (resp && resp.success) {
        // alert(resp.success.Message)
        // this.users[userIndex].email_is_verified=0
        this.toastrService.success('Details updated succesfully');
      } else {
        this.toastrService.error('There was an issue updating.. Try again later');
      }
    });
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
      return this.users;
    } else {
      const filtered = this.users.filter(user => {
        if (user[filterType] !== null) {
        return user[filterType].toLowerCase().includes(value.toLowerCase())
        }
      });
      this.users = filtered;
    }
  }

  clearSearch = () => {
    this.searchValue = null;
    return this.getUsers();
  }

  delete = (user) => {
    this.userService.deleteUser(this.selectedDelUser).subscribe(resp => {
      if (resp && resp.success) {
       this.toastrService.success('Details deleted succesfully');
     } else {
        this.toastrService.error('There was an issue deleting.. Try again later');
     }
    });
  }

}
