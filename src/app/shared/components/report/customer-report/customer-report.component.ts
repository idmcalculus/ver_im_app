 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../../../modules/admin/admin.service';
import { UserService } from '../../../../modules/user/user.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pools',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class UserreportComponent implements OnInit {
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
}
