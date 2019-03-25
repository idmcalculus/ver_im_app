import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  currentUserSubscription:Subscription;
  userinfo:User={user_category:'none',email:''};

  constructor(
    private authService:AuthService,
    private router:Router) { 
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      console.log("change occured "+JSON.stringify(user))
      this.userinfo = user;
  });
  }


  logout(){
    if(confirm('Are you sure you want to logout')){
      this.authService.logout();
      this.router.navigate(['signin',{}]);
    }
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.currentUserSubscription.unsubscribe();
  }

}
