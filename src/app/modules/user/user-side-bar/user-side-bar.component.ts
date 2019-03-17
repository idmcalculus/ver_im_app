import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html'
})
export class UserSideBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  logout(){
    if(confirm('Are you sure you want to logout')){
      this.router.navigate(['home',{}]);
    }
  }

}
