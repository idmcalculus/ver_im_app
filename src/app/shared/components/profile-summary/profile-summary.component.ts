import { Component, OnInit,Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.css']
})
export class ProfileSummaryComponent implements OnInit {
  @Input() public user:User={email:'',password:'',country:'',first_name:'',last_name:'',bank_name:''};
  
  constructor() { }

  ngOnInit() {
  }

}
