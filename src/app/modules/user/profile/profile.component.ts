import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import {AuthService} from './../../../core/auth/auth.service';
import {UserService} from './../user.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  user:User={email:'',password:'',country:'',first_name:'',last_name:'',bank_name:''};
  userSubscription:Subscription;
  isSubmitting;
  countries:string[]=['Nigeria','Ghana']
  bankList:string[]=['Gt Bank','First Bank','Fidelity','UBA','Diamond Bank','FCMB']
  dateModel:Date;


  constructor(
    private authService:AuthService,
    private userService:UserService
    ) { 
        
        this.userSubscription = this.authService.currentUser.subscribe(userInfo =>{
        if(userInfo){
          this.user = userInfo;
          if(this.user.year_of_birth){
            this.dateModel = new Date(`${this.user.year_of_birth},${this.user.month_of_birth} ${this.user.day_of_birth}`);
          }else{
            this.dateModel = new Date('1994,08 23');
          }
        }
      })
  }

  ngOnInit(){

  }

  ngOnDestroy(){
      this.userSubscription.unsubscribe()
  }

  updateProfile(){
    
      var obb:any = this.dateModel;
      if(obb){
        if(typeof(obb)!="string"){
          obb = obb.toISOString().substring(0,10);
        }
        this.user.day_of_birth = obb.split("-")[2];
        this.user.month_of_birth = obb.split("-")[1];
        this.user.year_of_birth = obb.split("-")[0];
      }
      this.isSubmitting = this.userService.updateProfile(this.user).subscribe(resp=>{
        if(resp.success){
          alert(resp.success.Message)
        }
      });
  }


  setGender(genderSelected: string): void {
    
    this.user.gender = genderSelected;
    console.log("changed to: "+this.user.gender)
  }

}
