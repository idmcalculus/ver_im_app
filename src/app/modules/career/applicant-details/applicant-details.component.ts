import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Applicant } from 'src/app/shared/models/Applicants';
import { CareerService } from '../career.service';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css']
})
export class ApplicantDetailsComponent implements OnInit {
  @Input() public applicant:Applicant;
  @Output() submit = new EventEmitter<Applicant>(); 

  constructor(
    private careerAppService:CareerService
  ) {
   
   }

  ngOnInit() {

  }

  backtoList(){
    this.submit.emit(null)
  }

  deleteApplication(id:string){

    if(confirm("Are you sure to delete?")){
      this.careerAppService.deleteCareerById(id).subscribe(resp=>{
        if(resp && resp.success){
          // this.backtoList();
          window.location.href="/admin/manage-career/applicants";
        }
      })
    }
    
    
  }

  shortList(isEnabled:boolean){
    this.careerAppService.shortListCareerById(this.applicant.id,isEnabled).subscribe(resp=>{
      console.log(JSON.stringify(resp))
      if(resp && resp.success){
        this.applicant.shortlist = !this.applicant.shortlist;
      }
    })
  }

}
