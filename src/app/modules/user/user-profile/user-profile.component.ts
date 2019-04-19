import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import {AuthService} from './../../../core/auth/auth.service';
import {UserService} from './../user.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit{

  user:User;
  userSubscription:Subscription;
  isSubmitting;
  countries:string[]=['Nigeria','Ghana']
  bankList:string[]=['Gt Bank','First Bank','Fidelity','UBA','Diamond Bank','FCMB']
  dateModel:Date;
  opt1selected:boolean=false;
  opt2selected:boolean=false;
  dayComponent = ['1','2','3','4','5','6','7','8','9','10',
                  '11','12','13','14','15','16','17','18','19','20',
                  '21','22','23','24','25','26','27','28','29','30','31'];
  monthComponent = [{count:'1',title:'Jan'},{count:'2',title:'Feb'},
  {count:'3',title:'Mar'},{count:'4',title:'Apr'},
  {count:'5',title:'May'},{count:'6',title:'Jun'},
  {count:'7',title:'Jul'},{count:'8',title:'Aug'},
  {count:'9',title:'Jan'},{count:'10',title:'Oct'},
  {count:'11',title:'Nov'},{count:'12',title:'Dec'}]


  constructor(
    private authService:AuthService
    ) { 
        
        this.userSubscription = this.authService.currentUser.subscribe(userInfo =>{
          if(userInfo){
            this.user = userInfo;
            if(this.user.updates_on_new_plans){
              this.opt1selected = this.user.updates_on_new_plans==0?false:true;
              this.opt2selected = this.user.email_updates_on_investment_process==0?false:true;
            }
          }
        })
    }

  ngOnInit(){

  }

  ngOnDestroy(){
      this.userSubscription.unsubscribe()
  }

  



}
