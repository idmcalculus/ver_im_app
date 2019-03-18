import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// import {DatasharerService} from './../../../core/datasharer/datasharer.service';
import {AuthService} from './../../../core/auth/auth.service'

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html'
})
export class UserSideBarComponent implements OnInit {

  constructor(
    private router:Router,
    private authService:AuthService
    ) { }

  ngOnInit() {
  }

  logout(){
    if(confirm('Are you sure you want to logout')){
      this.authService.logout();
      this.router.navigate(['signin',{}]);
    }
  }

}
