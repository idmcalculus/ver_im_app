import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { UserDashboard } from 'src/app/shared/models/UserDashboard';
import { UserService } from '../user.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html'
})
export class UserDashboardComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  // public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

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



}
