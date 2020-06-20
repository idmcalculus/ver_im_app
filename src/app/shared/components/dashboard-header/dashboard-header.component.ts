import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.scss']

})
export class DashboardHeaderComponent implements OnInit {

  @Input() public isUser: boolean;
  @Input() public userDetails: User;
  @Input() public sideDrawer: any;
  @Output() sidebar = new EventEmitter();

  constructor(
    private authService: AppAuthService,
    private router: Router

    ) {
  }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebar.emit();
  }

  settings() {
    this.router.navigateByUrl('user/settings');
  }

  password() {
    this.router.navigateByUrl('user/settings/password');
  }

  logout() {
    if (confirm('Are you sure you want to logout')) {
      this.authService.logout();
      this.router.navigate(['signin', {}]);
    }
  }

  setPlanOperation(investment){
    this.authService.setCurrentPlanOperation(investment);
  }

 /* TabControl(){
  const items = document.querySelector('.dropdown-menu');
  items.classList.toggle('show');

} */

}
