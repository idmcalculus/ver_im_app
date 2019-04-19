import { Component, OnInit } from '@angular/core';
import { CareerApplication } from 'src/app/shared/models/CareerApplication';
import { CareerService } from 'src/app/modules/career/career.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  careerApplications:[CareerApplication]
  isLoading:boolean=true;

  constructor(private careerService:CareerService) { }

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

}
