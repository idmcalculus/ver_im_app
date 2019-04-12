import { Component, OnInit } from '@angular/core';
import { UserDashboard } from 'src/app/shared/models/UserDashboard';
import { UserService } from '../user.service';
import { Investment } from 'src/app/shared/models/Investment';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html'
})
export class UserDashboardComponent implements OnInit {
  dashBoardData:UserDashboard;
  usersInvestments:[Investment]
  isLoading:boolean=true;
  selectedInvestment:number=-1;
  investmentInfo:Investment={duration:'0',investment_amount:0};
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getusersInvestment().subscribe(resp=>{
      if(resp && resp.success){
        this.usersInvestments = resp.success.Data
        this.isLoading = false;
      }
    });
  }

  showDetails(){
    this.investmentInfo = this.usersInvestments[this.selectedInvestment];
  }



}
