import { Injectable } from '@angular/core';
import {HttpService} from './../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  
  constructor(
    private httpService:HttpService
  ) { }
  
  getInvestments(): Observable<any> {
    return this.httpService.postRequest('investment/list',{});
  }
}
