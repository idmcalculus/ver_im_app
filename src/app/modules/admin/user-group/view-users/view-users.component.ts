import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/user/user.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InvestmentService } from 'src/app/modules/investment/investment.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

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
                private userService: UserService) {
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
              this.adminUsers.forEach((user: any, i) => user.selected = false);

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
    for (let i = 0; i < this.adminUsers.length; i++) {
        {
        this.adminUsers[i].selected = this.selectedAll;
        }
    }
    this.getCheckedUser();
    }

    checkIfAllSelected() {
    this.selectedAll = this.adminUsers.every(user => {
        return user.selected === true;
    });
    this.getCheckedUser();
    }

    getCheckedUser() {
    this.checkedUser = [];
    for (let i = 0; i < this.adminUsers.length; i++) {
        if (this.adminUsers[i].selected) {
        this.checkedUser.push(this.adminUsers[i]);
        }
    }
    }

}


