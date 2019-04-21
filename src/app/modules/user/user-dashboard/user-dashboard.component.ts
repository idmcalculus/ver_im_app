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
  mockData:any = {"Data": {
            "number_of_pools": "5",
            "investment_return": [
                {
                    "investment_amount": "500000.00",
                    "yielded_investment_amount": 10500000,
                    "yielded_date": {
                        "date": "2019-04-01 15:03:36.000000",
                        "timezone_type": 3,
                        "timezone": "UTC"
                    },
                    "returned_amount": "20000000",
                    "yielded_type": "Credit",
                    "yielded_amount": 10000000
                },
                {
                    "investment_amount": "500000.00",
                    "yielded_investment_amount": 10600000,
                    "yielded_date": {
                        "date": "2019-04-02 06:26:01.000000",
                        "timezone_type": 3,
                        "timezone": "UTC"
                    },
                    "returned_amount": "200000",
                    "yielded_type": "Credit",
                    "yielded_amount": 100000
                },
                {
                    "investment_amount": "500000.00",
                    "yielded_investment_amount": 10650000,
                    "yielded_date": {
                        "date": "2019-04-02 06:34:12.000000",
                        "timezone_type": 3,
                        "timezone": "UTC"
                    },
                    "returned_amount": "100000",
                    "yielded_type": "Credit",
                    "yielded_amount": 50000
                },
                {
                    "investment_amount": "500000.00",
                    "yielded_investment_amount": 10900000,
                    "yielded_date": {
                        "date": "2019-04-02 14:34:52.000000",
                        "timezone_type": 3,
                        "timezone": "UTC"
                    },
                    "returned_amount": "500000",
                    "yielded_type": "Credit",
                    "yielded_amount": 250000
                }
            ],
            "investment_report": [
                {
                    "id": 7,
                    "user_id": "owolabi.sunday08@gmail.com",
                    "investment_id": "9",
                    "title": "New user bought pool(s)",
                    "description": "Owolabi have successfully bought 2 pools.",
                    "returned_amount": "20000000",
                    "created_at": "2019-04-01 15:03:36",
                    "updated_at": "2019-04-01 15:03:36",
                    "payment_type": "Credit"
                },
                {
                    "id": 8,
                    "user_id": "owolabi.sunday08@gmail.com",
                    "investment_id": "9",
                    "title": "New user bought pool(s)",
                    "description": "Owolabi have successfully bought 2 pools.",
                    "returned_amount": "200000",
                    "created_at": "2019-04-02 06:26:01",
                    "updated_at": "2019-04-02 06:26:01",
                    "payment_type": "Credit"
                },
                {
                    "id": 9,
                    "user_id": "owolabi.sunday08@gmail.com",
                    "investment_id": "9",
                    "title": "New user bought pool(s)",
                    "description": "Owolabi have successfully bought 1 pools.",
                    "returned_amount": "100000",
                    "created_at": "2019-04-02 06:34:12",
                    "updated_at": "2019-04-02 06:34:12",
                    "payment_type": "Credit"
                },
                {
                    "id": 11,
                    "user_id": "adebiyipaul1@gmail.com",
                    "investment_id": "9",
                    "title": "New user bought pool(s)",
                    "description": "Paul have successfully bought 5 pools.",
                    "returned_amount": "500000",
                    "created_at": "2019-04-02 14:34:52",
                    "updated_at": "2019-04-02 14:34:52",
                    "payment_type": "Credit"
                }
            ]
        }
      }


  constructor(private userService:UserService,
    private authService:AuthService) { }

  ngOnInit() {
    this.manipulateChartData();

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
    
    // console.log('i agt it: '+JSON.stringify(this.investmentInfo))
    this.userService.getUserDashBoard(investmentId,userEmail).subscribe(resp=>{
      if(resp && resp.success){
        this.dashBoardData = resp.success.Data
        
      }else{
        this.dashBoardData = {number_of_pools:0,investment_return:[],investment_report:[]}
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

  manipulateChartData(){
    this.lineChartData = [];
    this.lineChartLabels = [];
    var cellData1 = {data: [], label: 'Invested Amount'};
    var cellData2 = {data: [], label: 'Balance'};
    var cellData3 = {data: [], label: 'Yielded AAmount'};
    this.mockData.Data.investment_return.forEach(x=>{
      cellData1.data.push(x.investment_amount)
      cellData2.data.push(x.yielded_investment_amount)
      cellData3.data.push(x.yielded_amount)
      this.lineChartLabels.push(this.formatDate(x.yielded_date.date))
      
    });
    this.lineChartData.push(cellData1)
    this.lineChartData.push(cellData2)
    this.lineChartData.push(cellData3)
    console.log('here i have :: '+JSON.stringify(this.lineChartData))
  }

  formatDate(dateString:string){
    dateString = dateString.substring(0,16);
    if(Number(dateString.substring(11,13))>12){
      dateString = dateString+" PM"
    }else{
      dateString = dateString+" AM"
    }
    // var newdate = new Date(dateString.substring(0,19))
    // var formattedDate =newdate.getUTCHours()+":"+newdate.getUTCMinutes()+" "+newdate.getUTCDate();
    return dateString;
  }



}
