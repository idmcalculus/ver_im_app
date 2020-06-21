import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  dropdownClose: any[];
  userInfo: User;
  @Input() public isUser: boolean;
  @Output() sidebarToggle = new EventEmitter();
  style: any;

  constructor(
    private router: Router,
    private authService: AppAuthService
    ) {

    this.userSubscription = this.authService.currentUser.subscribe(userInfo => {
        this.userInfo = userInfo;
    });

  }

  ngOnInit() {}

  sidebar(close = true) {
    this.sidebarToggle.emit();
    return close === false ? this.dropdown() : null;
  }

  logout() {
    if (confirm('Are you sure you want to logout')) {
      this.authService.logout();
      this.router.navigate(['signin', {}]);
    }
  }

  dropdown(...events) {
    if (events.length === 0) {
      this.dropdownClose = [];
      const dropdown = document.getElementsByClassName('dropdown-btn');
      for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].classList.remove('active');
        const dropdownContent = dropdown[i].nextElementSibling;
        this.dropdownClose.push(dropdownContent);
      }
      this.dropdownClose.forEach(elem => elem.style.display = 'none');
    } else {
        events[0].classList.toggle('active');
        events[1].style.display === 'block' ? events[1].style.display = 'none' : events[1].style.display = 'block';
        this.dropdownClose = [];
        const dropdown = document.getElementsByClassName('dropdown-btn');
        for (let i = 0; i < dropdown.length; i++) {
          const dropdownContent = dropdown[i].nextElementSibling;
          this.dropdownClose.push(dropdownContent);
          events[0] !== dropdown[i] ? dropdown[i].classList.remove('active') : null;
        }
        this.dropdownClose.forEach(elem => elem !== events[1] ? elem.style.display = 'none' : null);
    }
  }
}
