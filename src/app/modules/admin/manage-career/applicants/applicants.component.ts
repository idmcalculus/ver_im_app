import { Component, OnInit } from '@angular/core';
import { CareerApplication } from 'src/app/shared/models/CareerApplication';
import { CareerService } from 'src/app/modules/career/career.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  careerApplications:[CareerApplication]
  isLoading:boolean=true;
  selectedUser:User;

  constructor(private careerService:CareerService,
    private userService:UserService) { }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(){
    this.careerService.getCareerApplications().subscribe(resp=>{
      if(resp && resp.success){
        this.careerApplications = resp.success.Data;
      }
      this.isLoading= false;
    })
  }

  viewUserInfo(selectedIndex){
    this.isLoading= true;
    this.userService.getProfileDetails(this.careerApplications[selectedIndex].email).subscribe(resp=>{
      if(resp && resp.success){
        this.selectedUser = resp.success.Data.user[0];
      }
      this.isLoading= false;
    })
  }
}
