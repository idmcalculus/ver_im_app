import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/modules/career/career.service';
import { Career } from 'src/app/shared/models/Career';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isLoading:boolean=true;
  careerList:any=[]
  selectedCareer:Career
  constructor(private careerService:CareerService) { }

  ngOnInit() {
    this.careerService.getCareers().subscribe(resp=>{
      if(resp && resp.success){
        this.careerList = resp.success.Data
        // console.log('Data arr :: '+JSON.stringify(this.careerList))
      }
      this.isLoading = false;
    })
  }

  viewCareerDetails(index){
    this.selectedCareer = this.careerList[index];
  }

  callBack(career){
    if(career){
      this.selectedCareer = null;
      this.careerList = career
    }else{
      this.selectedCareer = null;
    }
  }

}
