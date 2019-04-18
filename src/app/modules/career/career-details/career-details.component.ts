import { switchMap } from 'rxjs/operators';
import { Component, OnInit,Input } from '@angular/core';
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

  constructor() { 
    
  }

  ngOnInit() {
    this.career.career_responsibilities = JSON.parse(this.career.career_responsibilities)
    console.log('i gat it :: '+JSON.stringify(this.career))
  }



}
