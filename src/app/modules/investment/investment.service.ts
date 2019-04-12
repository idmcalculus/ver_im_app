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

  
  addInvestment(investment:Investment):Observable<any>{
    var imageBody ={"investment_image":investment.investment_image};
    return this.httpService.postRequest(`investment/create?
    title=${investment.title}&description=${investment.description}
    &category_id=${investment.category_id}&max_num_of_slots=${investment.max_num_of_slots}
    &duration=${investment.duration}&expected_return_period=${investment.expected_return_period}&
    investment_amount=${investment.investment_amount}
    &expected_return_amount=${investment.expected_return_amount}`,imageBody);
  }

  updateInvestment(investment:Investment):Observable<any>{
    var imageBody ={"investment_image":investment.investment_image};
    return this.httpService.postRequest(`investment/update?
    title=${investment.title}&description=${investment.description}
    &investment_id=${investment.id}
    &category_id=${investment.category_id}&max_num_of_slots=${investment.max_num_of_slots}
    &duration=${investment.duration}&expected_return_period=${investment.expected_return_period}&
    investment_amount=${investment.investment_amount}
    &expected_return_amount=${investment.expected_return_amount}`,imageBody);
  }
  
  getInvestments(): Observable<any> {
    return this.httpService.postRequest('investment/list',{});
  }

  getUserInvestments(email): Observable<any> {
    return this.httpService.postRequest('investment_user/listInvestmentOfUser', {"user_id":email});
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
