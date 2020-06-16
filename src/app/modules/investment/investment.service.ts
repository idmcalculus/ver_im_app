import { Injectable } from '@angular/core';
import { HttpService } from './../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Investment } from './../../shared/models/Investment';
import { Category } from 'src/app/shared/models/Category';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { InvestmentGroup } from 'src/app/shared/models/InvestmentGroup';


@Injectable({ providedIn: 'root' })
export class InvestmentService {

  constructor(
    private httpService: HttpService,
    private cloudinaryService: CloudinaryService
  ) { }

  addInvestment(investment: Investment): Observable<any> {
    var imageBody = { "investment_image": investment.investment_image };
    return this.httpService.postRequest(`investment/create?
    title=${investment.title}&description=${investment.description}
    &category_id=${investment.category_id}&max_num_of_slots=${investment.max_num_of_slots}
    &duration=${investment.duration}&expected_return_period=${investment.expected_return_period}
    &investment_amount=${investment.investment_amount}
    &show_publicly=${investment.show_publicly ? 1 : 0}
    &estimated_percentage_profit=${investment.estimated_percentage_profit}
    &expected_return_amount=${investment.expected_return_amount}`, imageBody, true,)
    ;
  }

  updateInvestment(investment: Investment): Observable<any> {
    var imageBody = { "investment_image": investment.investment_image };
    return this.httpService.postRequest(
      `investment/update?title=${investment.title}&description=${investment.description}&investment_id=${investment.id}
    &category_id=${investment.category_id}&max_num_of_slots=${investment.max_num_of_slots}&duration=${investment.duration}
    &expected_return_period=${investment.expected_return_period}&investment_amount=${investment.investment_amount}
    &estimated_percentage_profit=${investment.estimated_percentage_profit}&show_publicly=${investment.show_publicly ? 1 : 0}&expected_return_amount=${investment.expected_return_amount}`, imageBody, true);
  }

  getStats(id: Number): Observable<any> {
    return this.httpService.postRequest(`trackViews?investment_id=${id}`, {});
  }

 

  getInvestments(is_frontend: boolean): Observable<any> {
    return this.httpService.postRequest(`investment/list?is_frontend=${is_frontend}`, {});
  }

  getUserInvestments(email): Observable<any> {
    return this.httpService.postRequest('investment_user/listInvestmentOfUser', { "user_id": email });
  }

  getpoolReport() {
    return this.httpService.postRequest('investment_user/getInvestmentPerDay?', null);
  }

  getInvestment(investmentId: string) {
    return this.httpService.postRequest(`investment/show?investment_id=${investmentId}`, {});
  }


  getCategories() {
    return this.httpService.postRequest(`category/list`, {});
  }

  addCategory(category: Category) {
    return this.httpService.postRequest(`category/create?category_name=${category.category_name}`, {}, true, null);
  }

  updateCategory(category: Category) {
    return this.httpService.postRequest(`category/update?category_name=${category.category_name}
    &category_id=${category.id}`, {}, true, null);
  }

  deleteCategory(category: Category) {
    return this.httpService.postRequest(`category/delete`, { category_id: category.id }, true);
  }

  joinInvestment(transaction: Transaction) {
    return this.httpService.postRequest(`investment_user/create?investment_id=${transaction.investment_id}
    &number_of_pools=${transaction.number_of_pools}&amount_paid=${transaction.amount_paid}
    &payment_reference=${transaction.payment_reference}`, {}, true);
  }

  checkTransaction(transaction: Transaction) {
    return this.httpService.postExpressRequest(``, true);
  }
  
  verifyTransaction(transactionId) {
    return this.httpService.postRequest(`investment_user/transaction/verify`, {secret: 'ourversasecretkey',transaction_id: transactionId}, true);
  }

  createTransactionRecord(transactionId,userId,investmentId) {
    return this.httpService.postRequest(`investment_user/transaction/create`, {investment_id: investmentId,transaction_id: transactionId,user_id:userId}, true);
  }

  endInvestment(investmentId: string) {
    return this.httpService.postRequest(`investment/endInvestment`, { investment_id: investmentId }, true);
  }

  startInvestment(investmentId: string) {
    return this.httpService.postRequest(`investment/startInvestment`, { investment_id: investmentId }, true);
  }

  pullOutFromInvestment(investmentId: string) {
    return this.httpService.postRequest(`investment_user/pullOutOfInvestment?investment_id=${investmentId}`, {}, true);
  }

  addInvestmentGroup(investmentGroup: InvestmentGroup) {
    return this.httpService.postRequest(`investment/addGroup?group_name=${investmentGroup.group_name}`, {}, true);
  }

  getInvestmentGroups() {
    return this.httpService.postRequest(`investment/getGroups`, {});
  }

  getDetails(): Observable<any> {
    return this.httpService.postRequest(`getViews`, {});
  }

  deleteInvestmentGroup(investmentGroup: InvestmentGroup) {
    return this.httpService.postRequest(`investment/deleteGroup?group_name=${investmentGroup.group_name}`, true);
  }

  addInvestmentsToGroup(investmentGroup: InvestmentGroup, investmentId: {}) {
    return this.httpService.postRequest(`investment/addToGroup?group_name=${investmentGroup.group_name}&investment_id=${investmentId}`, {}, true);
  }

  getInvestmentGroup(group) {
    return this.httpService.postRequest(`investment/getInvestmentGroup?group_name=${group.group_name}`, {}, true);
  }
}
