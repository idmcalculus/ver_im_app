import { Component, OnInit } from '@angular/core';
import { CareerService } from './career.service';
import { Career } from 'src/app/shared/models/Career';
import { CareerDetailsComponent } from './career-details/career-details.component';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  isLoading:boolean=true;
  careerList:[Career]
  selectedCareer:Career;
  careerDetail:CareerDetailsComponent;
  constructor(private careerService:CareerService) { }

  ngOnInit() {

    this.careerService.getCareers().subscribe(resp=>{
      if(resp && resp.success){
        this.careerList = resp.success.Data
        // console.log(JSON.stringify(this.careerList))
      }
      this.isLoading = false;
    })
  }

  viewCareerDetails(indexNumber){
    this.selectedCareer = this.careerList[indexNumber]
  }

  

}
