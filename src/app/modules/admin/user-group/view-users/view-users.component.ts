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
    adminUsers: [];
    returnedArray: string[];
    index: any;

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

    /*getUserInvestments(email: string) {
        this.isLoading = true;
        return this.userAdmins.forEach(each => {
            this.email = each.email;
            console.log(this.email);
        });
        const data = {
            user_id: this.email
        };
        this.investmentService.getUserInvestments(data).subscribe(x => {
            if (x && x.success) {
                console.log(x.success.Data);
            }
        });

    }*/
}


