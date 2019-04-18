import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/modules/career/career.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isLoading:boolean=true;
  careerList:any=[]
  constructor(private careerService:CareerService) { }

  ngOnInit() {
    this.careerService.getCareers().subscribe(resp=>{
      if(resp && resp.success){
        this.careerList = resp.success.Data
      }
      this.isLoading = false;
    })
  }

}
