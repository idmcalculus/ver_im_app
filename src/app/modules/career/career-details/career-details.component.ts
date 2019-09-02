import { switchMap } from 'rxjs/operators';
import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { Career } from 'src/app/shared/models/Career';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { CareerService } from '../career.service';

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.css']
})
export class CareerDetailsComponent implements OnInit {

  
  @Input() public career:Career;
  @Input() public isUser:boolean=true;
  
  @Output() submit = new EventEmitter<Career>();

  constructor(private careerAppService:CareerService) { 
    
  }

  ngOnInit() {
    // console.log("icoming is :: "+JSON.stringify(this.career))
    if(typeof(this.career.career_responsibilities)=='string'){
      
      
      console.log("got id :: "+JSON.stringify(this.career))
      this.career.career_responsibilities = JSON.parse(this.career.career_responsibilities)
    }
    
  }

  backtoList(){
    this.submit.emit(null)
  }

  

}
