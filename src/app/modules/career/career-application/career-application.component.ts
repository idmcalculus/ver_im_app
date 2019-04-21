import { Component, OnInit,Input } from '@angular/core';
import { Career } from 'src/app/shared/models/Career';
import { ActivatedRoute } from '@angular/router';
import { CareerApplication } from 'src/app/shared/models/CareerApplication';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CareerService } from '../career.service';

@Component({
  selector: 'app-career-application',
  templateUrl: './career-application.component.html',
  styleUrls: ['./career-application.component.css']
})
export class CareerApplicationComponent implements OnInit {
  user:User;
  userSubscription:Subscription;
  careerId:string;
  careerApplication:CareerApplication={email:''}
  isLoading:boolean=false;
  isSubmitting:any;

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private careerService:CareerService) { 
    this.userSubscription = this.authService.currentUser.subscribe(userInfo =>{
      if(userInfo){
        this.user = userInfo;
        this.careerApplication = userInfo;
      }//else take to login and redirect
      // this.isLoading = false;
    })
  }

  ngOnInit() {
    this.route.params.subscribe(resp=>{
      this.careerId = resp.careerId;
    })
  }


  apply(){
    this.careerApplication.career_id = this.careerId;
    this.isSubmitting = new Promise((resolve, reject) => {
      this.careerService.applyForCareer(this.careerApplication).subscribe(resp=>{
        if(resp && resp.success){
          alert(resp.success.Message)
        }
        resolve()
      })
    });
    
    
  }



}
