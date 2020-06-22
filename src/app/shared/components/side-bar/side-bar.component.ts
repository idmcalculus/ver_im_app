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
  dropdownTabs: any[];
  userInfo: User;
  @Input() public isUser: boolean;
  @Output() sidebarToggle = new EventEmitter();

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
      this.dropdownTabs = [];
      const dropdown = document.querySelectorAll('a.dropdown-btn');
      [].forEach.call(dropdown, (elem) => {
        elem.classList.remove('active');
        const dropdownContent = elem.nextElementSibling;
        this.dropdownTabs.push(dropdownContent);
      });
      [].forEach.call(this.dropdownTabs, elem => elem.style.display = 'none');
    } else {
        events[0].classList.toggle('active');
        events[1].style.display === 'block' ? events[1].style.display = 'none' : events[1].style.display = 'block';
        this.dropdownTabs = [];
        const dropdown = document.querySelectorAll('a.dropdown-btn');
        [].forEach.call(dropdown, (elem) => {
          elem !== events[0] ? elem.classList.remove('active') : null;
          const dropdownContent = elem.nextElementSibling;
          this.dropdownTabs.push(dropdownContent);
        });
        [].forEach.call(this.dropdownTabs, elem => elem !== events[1] ? elem.style.display = 'none' : null);
      }
  }
}
