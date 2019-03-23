import { Injectable } from '@angular/core';
import {HttpService} from './../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/shared/models/Transaction';
import {Investment}  from './../../shared/models/Investment';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  
  constructor(
    private httpService:HttpService
  ) { }

  
  adInvestment(investment:Investment):Observable<any>{
    return this.httpService.postRequest(`investment/create?
    title=${investment.title}&description=${investment.description}
    &category_id=${investment.category_id}&max_num_of_slots=${investment.max_num_of_slots}
    &duration=${investment.duration}&expected_return_period=${investment.expected_return_period}&
    investment_amount=${investment.investment_amount}
    &expected_return_amount=${investment.expected_return_amount}&investment_image=${investment.investment_image}`,null);
  }
  
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
