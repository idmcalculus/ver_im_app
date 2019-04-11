import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../admin.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users:[User]
  isLoading:boolean=true;
  constructor(private userService:UserService,
     private adminService:AdminService) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp=>{
      if(resp && resp.success){
        this.users = resp.success.Data;
        // console.log("user one is: "+JSON.stringify(this.users[0]))
        this.isLoading =  false;
      }
    })
  }

  viewUserDetail(user:User){
    
  }

  updateUser(user,operation){
    if(operation=='enable'){
      this.userService.activateUser(user).subscribe(resp=>{
        if(resp && resp.success){
          alert(resp.success.Message)
        }
      })
    }else{
      this.userService.deactivateUser(user).subscribe(resp=>{
        if(resp && resp.success){
          alert(resp.success.Message)
        }
      })
    }
    
  }

}
