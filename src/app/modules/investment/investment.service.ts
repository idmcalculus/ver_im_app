import { Injectable } from '@angular/core';
import {HttpService} from './../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/shared/models/Transaction';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  
  constructor(
    private httpService:HttpService
  ) { }
  
  getInvestments(): Observable<any> {
    return this.httpService.postRequest('investment/list',{});
  }

  getUserInvestments(): Observable<any> {
    return this.httpService.postRequest('investment_user/listInvestmentOfUser',{});
  }

  getInvestment(investmentId:string){
    return this.httpService.postRequest(`investment/show?investment_id=${investmentId}`,{});
  }


  getCategories(){
    return this.httpService.postRequest(`category/list`,{});
  }

  joinInvestment(transaction:Transaction){
    return this.httpService.postRequest(`investment_user/create?
    investment_id=${transaction.investment_id}&number_of_pools=${transaction.number_of_pools}
    &amount_paid=${transaction.amount_paid}&payment_reference=${transaction.payment_reference}`,{});
  }
}
