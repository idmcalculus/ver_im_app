import { Component, OnInit } from '@angular/core';
// import {DatasharerService} from '../../core/datasharer/datasharer.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import {Router} from '@angular/router';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from '../investment/investment.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
 user:User={email:'',password:'',user_category:'User'};
 investment:Investment;
 investments:[Investment];

  constructor(
    private authService:AuthService,
    private router:Router,
    private service:AdminService
    ) { 
      this.authService.setInProfileView(true);
  }

  ngOnInit() {
    this.authService.validateSession().then(resp=>{
      if(resp.email){
        this.user = resp;
        if(this.user.user_category=='User'){
          window.location.href='/user'
        }
        this.investment = {description:'',expected_return_amount:'',duration:'',expected_return_period:''
        ,investment_amount:'',max_num_of_slots:'',title:'Testing'};
      }
    })
  }

  addInvestmnet(filledInvestment:Investment){
    alert('called '+JSON.stringify(filledInvestment));
    // this.service.adInvestment(this.investment).subscribe(resp=>{
    //    if(resp.success){
    //      alert(resp.success.Message);
    //    }
    // })
  }

  getInvestments(){

  }

  getInvestment(id:number){

  }

}
