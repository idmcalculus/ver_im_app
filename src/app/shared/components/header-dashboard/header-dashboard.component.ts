import { Component,Input, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html'
})
export class HeaderDashboardComponent implements OnInit {

  @Input()
  public isUser: boolean;

  @Input()
  public userDetails: User;

  constructor() {
    console.log('I recieved: '+this.isUser);
  }

  ngOnInit() {
    console.log('I recieved: '+this.isUser);
  }

}
