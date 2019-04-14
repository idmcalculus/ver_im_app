import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../admin.service';
import { UserService } from '../../user/user.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users:[User]
  selectedUser:User
  isLoading:boolean=true;
  constructor(private userService:UserService,
     private adminService:AdminService,private authService:AuthService) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp=>{
      if(resp && resp.success){
        this.users = resp.success.Data;
        // console.log("user one is: "+JSON.stringify(this.users[0]))
        this.isLoading =  false;
        // this.authService.se
      }
    })
  }

  viewUserDetail(userIndex){
    this.selectedUser = this.users[userIndex]
  }

  updateUser(user,operation){
    if(operation=='enable'){
      this.userService.activateUser(user).subscribe(resp=>{
        if(resp && resp.success){
          // alert(resp.success.Message)
          // this.users[userIndex].email_is_verified=1
        }
      })
    }else{
      this.userService.deactivateUser(user).subscribe(resp=>{
        if(resp && resp.success){
          // alert(resp.success.Message)
          // this.users[userIndex].email_is_verified=0
        }
      })
    }
    
  }

}
