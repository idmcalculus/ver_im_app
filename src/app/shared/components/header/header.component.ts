import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AppAuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  currentUserSubscription: Subscription;
  userinfo: User = { user_category: 'none', email: '' };
  show = false;

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
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let c = pageXOffset;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      let element = document.getElementById('header');
      element.classList.add('scrolled');
    } else {
      let element = document.getElementById('header');
      element.classList.remove('scrolled');
    }
  }

  delayOutput(){
    setTimeout (() => {
        this.show = true;
     }, 5000);
  }

  // router.events.subscribe((event: Event) => {
  //   if (event instanceof NavigationEnd ) {
  //     this.currentUrl = event.url;
  //   }
  // });

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
