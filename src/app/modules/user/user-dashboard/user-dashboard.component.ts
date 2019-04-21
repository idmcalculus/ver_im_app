import { Component, OnInit, Input,ViewChild } from '@angular/core';
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
  isGraphShown:boolean=false;
  lineChartData:any;
  lineChartLabels:any;


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
    if(this.selectedInvestment>=0){
      this.investmentInfo = this.usersInvestments[this.selectedInvestment];
      this.getUserDashBoard();
    }else{
      this.dashBoardData = {number_of_pools:0,investment_return:[],investment_report:[]}
    }
    
  }

  getUserDashBoard(){
    var userEmail = this.overiddenUser.email
    var investmentId = this.investmentInfo.id;
  
    this.userService.getUserDashBoard(investmentId,userEmail).subscribe(resp=>{
      if(resp && resp.success){
        this.dashBoardData = resp.success.Data
        this.manipulateChartData(this.dashBoardData.investment_return);
      }else{
        this.dashBoardData = {number_of_pools:0,investment_return:[],investment_report:[]}
        this.lineChartData=null;
      }
    })
  }

  showGraph(){
    if(this.lineChartData){
      this.isGraphShown = true;
    }
    
  }

  hideGraph(){
    this.isGraphShown = false;
  }

  manipulateChartData(investment_return:any){
    this.lineChartData = [];
    this.lineChartLabels = [];
    var cellData1 = {data: [], label: 'Invested Amount'};
    var cellData2 = {data: [], label: 'Balance'};
    var cellData3 = {data: [], label: 'Yielded AAmount'};
    investment_return.forEach(x=>{
      cellData1.data.push(x.investment_amount)
      cellData2.data.push(x.yielded_investment_amount)
      cellData3.data.push(x.yielded_amount)
      this.lineChartLabels.push(this.formatDate(x.yielded_date.date))
      
    });
    this.lineChartData.push(cellData1)
    this.lineChartData.push(cellData2)
    this.lineChartData.push(cellData3)
    // console.log('here i have :: '+JSON.stringify(this.lineChartData))
  }

  formatDate(dateString:string){
    dateString = dateString.substring(0,16);
    if(Number(dateString.substring(11,13))>12){
      dateString = dateString+" PM"
    }else{
      dateString = dateString+" AM"
    }
    return dateString;
  }



}
