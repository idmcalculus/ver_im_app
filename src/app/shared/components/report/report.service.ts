import { Injectable } from '@angular/core';
import {HttpService} from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { Report } from '../../models/Report';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(
    private httpService:HttpService
  ) { }
  
  createReport(report:Report): Observable<any> {
    return this.httpService.postRequest(`report/create?title=${report.title}
    &description=${report.description}&returned_amount=${report.returned_amount}
    &investment_id=${report.investment_id}&payment_type=${report.payment_type}`,{});
  }

  updateReport(report:Report): Observable<any> {
    return this.httpService.postRequest(`report/update?title=${report.title}
    &description=${report.description}&returned_amount=${report.returned_amount}
    &investment_id=${report.investment_id}&payment_type=${report.payment_type}
    &report_id=${report.id}`,{});
  }

  deleteReport(report:Report): Observable<any> {
    return this.httpService.postRequest(`report/delete?report_id=${report.id}`,{});
  }

}
