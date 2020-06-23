import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AppAuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  currentUserSubscription: Subscription;
  userinfo: User = { user_category: 'none', email: '' };
  show = false;
  isSticky = false;

  constructor(
    private authService: AppAuthService,
    private router: Router) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.userinfo = user;
    });
  }


  logout() {
    if (confirm('Are you sure you want to logout')) {
      this.authService.logout();
      this.router.navigate(['signin', {}]);
    }
  }

  ngOnInit() {
      this.delayOutput();
      this.onWindowScroll();
      document.addEventListener('mousewheel', () => {}, {passive: false});
  }

  @HostListener('document:mousewheel')
  onWindowScroll() {
    this.isSticky = document.body.scrollTop > 0 || document.documentElement.scrollTop > 0;
  }

  delayOutput() {
    setTimeout (() => {
        this.show = true;
     }, 5000);
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
