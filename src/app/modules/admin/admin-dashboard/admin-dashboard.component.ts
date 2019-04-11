import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service'
import { AdminDashboard } from 'src/app/shared/models/AdminDashboard';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  dashBoardData:AdminDashboard;
  isLoading:boolean=true;


  constructor(private adminService:AdminService) { }

  ngOnInit() {
      this.adminService.getDashBoardData().subscribe(resp=>{
        if(resp && resp.success){
          this.dashBoardData = resp.success.Data
          this.isLoading = false;
        }
      });
  }




}
