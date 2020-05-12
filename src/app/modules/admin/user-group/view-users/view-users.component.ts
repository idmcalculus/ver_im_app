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
    pageValue = 5;
    p2 = 1;
    userSubscription: Subscription;
    adminUsers: any[];
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
                this.adminUsers = users.success.Data.filter(user => user.user_category === 'Admin' || user.user_category === 'SuperAdmin');
                this.adminUsers.forEach((user: any, i) => user.index = i + 1);
                this.adminUsers.forEach(user => user.selected = false);
            }
            this.isLoading = false;
        });
    }

    setItemsPerPage(event) {
    this.pageValue = event;
    }

    selectAll() {
    this.adminUsers.forEach(user => {
        user.selected = this.selectedAll;
    });
    this.getCheckedUser();
    }

    checkIfAllSelected() {
    this.selectedAll = this.adminUsers.every(user => {
        return user.selected === true;
    });
    this.getCheckedUser();
    }

    getCheckedUser() {
        this.adminUsers.forEach(user => {
            if (user.selected) {
                this.checkedUser.push(user);
                console.log(this.checkedUser);
            }
        });
    }

   deleteSelected() {
        if (this.checkedUser.length > 0) {
            if (confirm('Are you sure you want to delete the selected Users?')) {
                this.isLoading = true;
                const filtered = this.adminUsers.filter(user => user.selected === true);
                filtered.forEach(async user => {
                    this.userService.getProfileDetails(user.email).subscribe(async resp => {
                        const details = await resp.success.Data;
                        const userId = details.user[0].id;
                        console.log(userId);
                        this.adminService.updateUserCategory(userId, 'User').subscribe(async resp => {
                            if (resp && resp.success) {
                                this.toastrService.success('Selected admin user(s) successfully removed');
                            } else {
                                this.toastrService.error('There was an error removing selected admin user(s)');
                            }
                            this.isLoading = false;
                            window.location.href = 'admin/user-group/view-users';
                        });
                    });
                });
            } else {
                this.toastrService.info('No user is selected!');
            }
        }
    }

}


