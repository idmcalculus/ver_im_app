import { Component, OnInit } from '@angular/core';
import { CareerApplication } from 'src/app/shared/models/CareerApplication';
import { CareerService } from 'src/app/modules/career/career.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/user/user.service';
import { Applicant } from 'src/app/shared/models/Applicants';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  careerApplications:[CareerApplication]
  isLoading:boolean=true;
  selectedUser:Applicant;

  constructor(
    private careerService:CareerService,
    private userService:UserService,
    private dynamicScrLoader:DynamicScriptLoaderService) { }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(){
    this.careerService.getCareerApplications().subscribe(resp=>{
      if(resp && resp.success){
        this.careerApplications = resp.success.Data;
        // console.log("i recieved :: "+JSON.stringify(this.careerApplications))
        this.dynamicScrLoader.loadSingle('data-table');   
        this.dynamicScrLoader.loadSingle('trigger-data-table');  
      }
      this.isLoading= false;
    })
  }

  viewUserInfo(selectedIndex){
    this.selectedUser = selectedIndex;
  }

  callBack(selectedCareer){
    this.selectedUser = null;
  }

}
