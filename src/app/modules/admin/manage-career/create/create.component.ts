import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/modules/career/career.service';
import { Career } from 'src/app/shared/models/Career';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  career:Career = {career_title:'',career_responsibilities:[]};
  respArray:any[]=[];
  finalArray:any[]=[];
  newResponsibility:string='';
  constructor(private careerService:CareerService) { }

  ngOnInit() {
  }

  createCareer(){
    this.career.career_responsibilities = JSON.stringify(this.respArray);
    this.career.deadline = new Date().toISOString();
    console.log(JSON.stringify(this.career))
    this.careerService.craeteCareer(this.career).subscribe
    (resp=>{
      if(resp && resp.success){
        alert(resp.success.Message) 
        this.career = null;
      }
    })
  }

  addResponsibility(){
    if(this.newResponsibility){
      var cnt = this.respArray.length;
      this.respArray.push(this.newResponsibility);
      this.finalArray.push({[cnt]: this.newResponsibility})
      this.newResponsibility = '';
    }
    
  }

  popOutRecord(index){
    this.respArray.splice(index,1);
    this.finalArray.splice(index,1)
  }

}
