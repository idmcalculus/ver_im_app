import { Injectable } from '@angular/core';
import {HttpService} from './../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  
  constructor(
    private httpService:HttpService
  ) { }

  
  createReport(reportDetails:any):Observable<any>{
    return this.httpService.postRequest(`report/create?
    title=${reportDetails.title}
    &description=${reportDetails.desacription}
    &returned_amount=${reportDetails.returnedAmnt}
    &investment_id=${reportDetails.investmentId}
    &payment_type=${reportDetails.paymentType}`,null);
  }
  
  // getReports(): Observable<any> {
  //   return this.httpService.postRequest('investment/list',{});
  // }
}
