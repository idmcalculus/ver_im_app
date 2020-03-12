import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../admin.service';
import { UserService } from '../../user/user.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  searchValue=''
  users:User[]
  selectedUser:User
  isLoading:boolean=true;
  constructor(
     private userService:UserService,
     private adminService:AdminService,
     private authService:AppAuthService,
     private dynamicScrLoader:DynamicScriptLoaderService,
     private toastrService: ToastrService
     ) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp=>{
      if(resp && resp.success){
        this.users = resp.success.Data;
        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');
        this.dynamicScrLoader.loadSingle('trigger-data-table');
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

  getUsers(){
    this.isLoading=true;
    this.userService.getUsers().subscribe(resp=>{
      if(resp && resp.success){
        this.users = resp.success.Data;
      }
      this.isLoading=false;
    })
  }

  updateDetails(user): any{
    this.userService.adminUpdateProfile(user).subscribe(resp=>{
      if(resp && resp.success){
        // alert(resp.success.Message)
        // this.users[userIndex].email_is_verified=0
        this.toastrService.success('Details updated succesfully');
      }else{
        this.toastrService.error('There was an issue updating.. Try again later');
      }
    })
  }

  filterTable(filterType, filterValue): any{
    const value = filterValue.target.value

    if (!value) {
      return this.users
    } else {
      const filtered = this.users.filter(user => {
        if (user[filterType] !== null)
        return user[filterType].toLowerCase().includes(value.toLowerCase())
      })
      console.log('Filtered', filtered);
      this.users = filtered;
    }
  }

  clearSearch = () => {
    this.searchValue = null;
    return this.getUsers();
  }
}
