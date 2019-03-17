import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DatasharerService} from './../../../core/datasharer/datasharer.service';

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html'
})
export class UserSideBarComponent implements OnInit {

  constructor(
    private router:Router,
    private dataSharerService:DatasharerService
    ) { }

  ngOnInit() {
  }

  logout(){
    if(confirm('Are you sure you want to logout')){
      this.dataSharerService.destroySession();
      this.router.navigate(['signin',{}]);
    }
  }

}
