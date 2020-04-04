import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  userSubscription: Subscription;
  userInfo: User;
  @Input()
  public isUser: boolean;
  constructor(
    private router: Router,
    private authService: AppAuthService
    ) {

    this.userSubscription = this.authService.currentUser.subscribe(userInfo => {
        this.userInfo = userInfo;
        console.log(userInfo);

    });

  }

  ngOnInit() {
    this.dropdown();
  }

  logout() {
    if (confirm('Are you sure you want to logout')) {
      this.authService.logout();
      this.router.navigate(['signin', {}]);
    }
  }

  dropdown() {
    const dropdown = document.getElementsByClassName('dropdown-btn');
    for (let i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener('click', function() {
        this.classList.toggle('active');
        let dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          dropdownContent.style.display = 'block';
        }
      });
    }

  }
}