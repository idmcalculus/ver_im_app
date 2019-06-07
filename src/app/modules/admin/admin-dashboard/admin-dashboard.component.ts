import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service'
import { AdminDashboard } from 'src/app/shared/models/AdminDashboard';
import { CareerService } from '../../career/career.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  dashBoardData:AdminDashboard;
  careers:[];
  isLoading:boolean=true;


  constructor(
    private adminService:AdminService,
    private careerService:CareerService) { }

  ngOnInit() {
      this.adminService.getDashBoardData().subscribe(resp=>{
        if(resp && resp.success){
          this.dashBoardData = resp.success.Data
          console.log("final resp :: "+JSON.stringify(this.dashBoardData))
          this.isLoading = false;
        }
      });
  }


  




}
