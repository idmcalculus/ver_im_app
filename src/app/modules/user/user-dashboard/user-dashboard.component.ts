import { Component, OnInit, Input } from '@angular/core';
import { UserDashboard } from 'src/app/shared/models/UserDashboard';
import { UserService } from '../user.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html'
})
export class UserDashboardComponent implements OnInit {
  @Input() public overiddenUser:User;
  dashBoardData:any={number_of_pools:0,investment_return:[],investment_report:[]};
  usersInvestments:[Investment]
  isLoading:boolean=true;
  selectedInvestment:number=-1;
  investmentInfo:Investment={duration:'0',investment_amount:0};
  constructor(private userService:UserService,
    private authService:AuthService) { }

  ngOnInit() {
    
    if(this.overiddenUser){
      // console.log("dashboard data 1 is :: "+JSON.stringify(this.overiddenUser))
      this.userService.getusersInvestment(this.overiddenUser.email).subscribe(resp=>{
        if(resp && resp.success){
          this.usersInvestments = resp.success.Data
          this.isLoading = false;
        }
      })
    }else{
        this.authService.currentUser.subscribe(resp=>{
          // console.log("dashboard data 2 is :: "+JSON.stringify(resp))
          if(resp){
            this.overiddenUser =resp;
            this.userService.getusersInvestment(resp.email).subscribe(resp=>{
              if(resp && resp.success){
                this.usersInvestments = resp.success.Data
                this.isLoading = false;
              }
            })
          }
        })
    }
    
  }

  showDetails(){
    this.investmentInfo = this.usersInvestments[this.selectedInvestment];
    this.getUserDashBoard();
  }

  getUserDashBoard(){
    var userEmail = this.overiddenUser.email
    var investmentId = this.investmentInfo.id;
    this.userService.getUserDashBoard(investmentId,userEmail).subscribe(resp=>{
      if(resp && resp.success){
        // console.log('i agt it: '+JSON.stringify(resp))
        this.dashBoardData = resp.success.Data
      }
    })
  }



}
