import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { AppAuthService } from "src/app/core/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-view-users",
    templateUrl: "./view-users.component.html",
    styleUrls: ["./view-users.component.scss"],
})
export class ViewUsersComponent implements OnInit {
    isLoading = false;
    loggedInUser: User;
    selectedUser: User;
    userSubscription: Subscription;

    constructor(private authService: AppAuthService) {
        this.userSubscription = this.authService.currentUser.subscribe(
            (userInfo) => {
                if (userInfo) {
                    this.loggedInUser = userInfo;
                }
            }
        );
    }

    ngOnInit() {}
}
