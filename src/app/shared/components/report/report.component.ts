import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import { Report } from '../../models/Report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportData:Report;
  constructor(private reportService:ReportService) { }

  ngOnInit() {
  }

  addReport(){
    this.reportService.createReport(this.reportData)
  }
}
