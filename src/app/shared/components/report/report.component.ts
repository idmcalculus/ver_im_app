import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ReportService } from './report.service';
import { Report } from '../../models/Report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  isPaymentreport:boolean=false;
  @Input() public modaltitle:string;
  @Input() public modalButtonTitle:string;
  @Input() public modalData:any;

  @Output() submit = new EventEmitter<Report>();
  constructor() { 
    
  }

  ngOnInit() {

  }


  modalSubmitted(){
    this.submit.emit(this.modalData);
  }

  


}
