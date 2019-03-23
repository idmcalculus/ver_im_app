import { Component,Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from 'src/app/core/auth/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html'
})
export class HeaderDashboardComponent implements OnInit {

  @Input()
  public isUser: boolean;

  @Input()
  public userDetails: User;

  constructor(
    private authService:AuthService,
    private router:Router
    
    ) {
    console.log('I recieved: '+this.userDetails);
  }

  ngOnInit() {
    console.log('I recieved: '+this.userDetails);
  }

  logout(){
    if(confirm('Are you sure you want to logout')){
      this.authService.logout();
      this.router.navigate(['signin',{}]);
    }
  }

}
