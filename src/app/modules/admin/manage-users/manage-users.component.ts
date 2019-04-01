import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent implements OnInit {

  users:[User]
  isLoading:boolean=true;
  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp=>{
      if(resp && resp.success){
        this.users = resp.success.Data;
        // console.log("user one is: "+JSON.stringify(this.users[0]))
        this.isLoading =  false;
      }
    })
  }

}
