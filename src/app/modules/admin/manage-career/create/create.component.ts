import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/modules/career/career.service';
import { Career } from 'src/app/shared/models/Career';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  career:Career = {career_title:'',career_responsibilities:[], career_requirements: [] };
  respArray:any[]=[];
  reqArray:any[]=[];
  finalArray:any[]=[];
  finalReqArray:any[]=[];
  newResponsibility:string='';
  newRequirement:string='';
  isSubmitting;
  constructor(private careerService:CareerService) { }

  ngOnInit() {
  }

  createCareer(){
    this.career.career_responsibilities = JSON.stringify(this.respArray);
    this.career.career_requirements = JSON.stringify(this.reqArray);

    this.isSubmitting = new Promise((resolve, reject) => {
          this.careerService.createCareer(this.career)
          .subscribe(resp=>{
            if(resp && resp.success){
              this.career = {career_title:'',career_responsibilities:[],career_requirements:[]};
            }
            resolve();
          })
    });
    
  }

  RemoveCareer(){
    
  }

  addResponsibility(){
    if(this.newResponsibility){
      var cnt = this.respArray.length;
      this.respArray.push(this.newResponsibility);
      this.finalArray.push({[cnt]: this.newResponsibility})
      this.newResponsibility = '';
    }
    
  }


  addRequirement(){
    if(this.newRequirement){
      var cnt = this.reqArray.length;
      this.reqArray.push(this.newRequirement);
      this.finalReqArray.push({[cnt]: this.newRequirement})
      this.newRequirement = '';
    }
  }

  popOutRecord(index){
    this.respArray.splice(index,1);
    this.finalArray.splice(index,1)
  }

  popOutReqRecord(index){
    this.reqArray.splice(index,1);
    this.finalReqArray.splice(index,1)
  }

}
