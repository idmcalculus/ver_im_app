import { Component,Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.scss']

})
export class DashboardHeaderComponent implements OnInit {

  @Input()
  public isUser: boolean;

  @Input()
  public userDetails: User;

  constructor(
    private authService:AppAuthService,
    private router:Router

    ) {
    // console.log('I recieved: '+this.userDetails);
  }

  ngOnInit() {
    // console.log('I recieved: '+this.userDetails);
  }

  logout(){
    if(confirm('Are you sure you want to logout')){
      this.authService.logout();
      this.router.navigate(['signin',{}]);
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
