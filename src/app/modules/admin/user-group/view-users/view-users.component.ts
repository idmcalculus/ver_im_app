import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/user/user.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-view-users',
    templateUrl: './view-users.component.html',
    styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {
    isLoading = false;
    loggedInUser: User;
    selectedUser: User;
    userSubscription: Subscription;
    adminUsers: any[];
    returnedArray: string[];
    index: any;
    selectedAll;
    checkedUser = [];

    constructor(private authService: AppAuthService,
                private userService: UserService,
                private adminService: AdminService,
                private toastrService: ToastrService) {
                this.userSubscription = this.authService.currentUser.subscribe((userInfo) => {
                        if (userInfo) {
                            this.loggedInUser = userInfo;
                        }
                    }
                );
                this.getAdminUsers();
    }

    ngOnInit() {}

    getAdminUsers() {
        this.isLoading = true;
        this.userService.getUsers().subscribe(users => {
            if (users && users.success) {
              this.adminUsers = users.success.Data.filter(user => user.user_category === 'Admin');
              this.adminUsers.forEach((user: any, i) => user.index = i + 1);
              this.adminUsers.forEach(user => user.selected = false);

              this.returnedArray = this.adminUsers.slice(0, 3);
            }
            this.isLoading = false;
        });
    }

     pageChanged(event: PageChangedEvent): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedArray = this.adminUsers.slice(startItem, endItem);
      }

    selectAll() {
    this.adminUsers.forEach(user => {
        user.selected = this.selectedAll;
    });
    // this.getCheckedUser();
    }

    checkIfAllSelected() {
    this.selectedAll = this.adminUsers.every(user => {
        return user.selected === true;
    });
    // this.getCheckedUser();
    }

    /*getCheckedUser() {
        this.adminUsers.forEach(user => {
            if (user.selected) {
                this.checkedUser.push(user);
                console.log(this.checkedUser);
            }
        });
    }*/
    deleteSelected() {
        this.isLoading = true;
        const filtered = this.adminUsers.filter(user => user.selected === false);
        filtered.forEach((user, i) => user.index = i + 1 );
        setTimeout(() => {
            this.adminUsers = filtered;
            this.isLoading = false;
        }, 3000);
        /*const selected = this.adminUsers.filter(user => user.selected === true);
        selected.forEach(user => {
            const data = {
            last_name: user.last_name,
            first_name: user.first_name,
            authentication_type: user.authentication_type,
            password: user.password,
            user_category: user.user_category,
            email: user.email
            };

            this.adminService.updateAdminUser(data, 'User').subscribe(resp => {
                if (resp && resp.success) {
                    console.log(resp);
                    this.toastrService.success('Selected user(s) successfully deleted');
                } else {
                    this.toastrService.error('There was an error deleting selected User(s)');
                }
                this.isLoading = false;
            });

        });*/
    }

}


