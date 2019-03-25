import { Component,Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  userSubscription:Subscription
  userInfo:User;
  @Input()
  public isUser:boolean;
  constructor(
    private router:Router,
    private authService:AuthService
    ) { 

    this.userSubscription = this.authService.currentUser.subscribe(userInfo =>{
        this.userInfo = userInfo;
    })
  }

  ngOnInit() {
  }

  logout(){
    if(confirm('Are you sure you want to logout')){
      this.authService.logout();
      this.router.navigate(['signin',{}]);
    }
  }

}
