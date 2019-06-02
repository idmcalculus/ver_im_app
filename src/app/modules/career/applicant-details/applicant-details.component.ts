import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Applicant } from 'src/app/shared/models/Applicants';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css']
})
export class ApplicantDetailsComponent implements OnInit {
  @Input() public applicant:Applicant;
  @Output() submit = new EventEmitter<Applicant>();

  constructor() { }

  ngOnInit() {

  }

  backtoList(){
    this.submit.emit(null)
  }

}
