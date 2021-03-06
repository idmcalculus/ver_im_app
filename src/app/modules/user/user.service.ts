import { Injectable } from '@angular/core';
import {HttpService} from './../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private httpService: HttpService
  ) { }

  getProfile(email: string) {
    return this.httpService.postRequest(`fetch_profile?email=${email}`, null);
  }

  getProfileDetails(email: string): Observable<any> {
    return this.httpService.postRequest(`fetch_profile?email=${email}`, null);
  }

  updateProfile(user: User): Observable<any> {
    return this.httpService.postRequest(`update_user?
    email=${user.email}&authentication_type=${user.authentication_type}
    &first_name=${user.first_name}&last_name=${user.last_name}
    &phone_number=${user.phone_number}&gender=${user.gender}
    &user_category=${user.user_category}&home_address=${user.home_address}
    &country=${user.country}&month_of_birth=${user.month_of_birth}
    &profile_picture=${user.profile_picture}
    &where_you_work=${user.where_you_work}&average_monthly_income=${user.average_monthly_income}
    &id=${user.id}`, null);
  }


  updatePreference(user: User): Observable<any> {
    return this.httpService.postRequest(`update_preference?
    updates_on_new_plans=${user.updates_on_new_plans ? 1 : 0}&id=${user.id}
    &email_updates_on_investment_process=${user.email_updates_on_investment_process ? 1 : 0}`, null);
  }

  updateBankDetails(user: User): Observable<any> {
    return this.httpService.postRequest(`update_account_detail?
    account_name=${user.account_name}&account_number=${user.account_number}
    &bank_name=${user.bank_name}&id=${user.id}`, null);
  }

  changePassword(password): Observable<any> {
    return this.httpService.postRequest(`change_password?password=${password}`, null);
  }

  activateUser(user: User): Observable<any> {
    return this.httpService.postRequest(`activate_user?
    email=${user.email}`, null);
  }

  deactivateUser(user: User): Observable<any> {
    return this.httpService.postRequest(`deactivate_user?
    email=${user.email}`, null);
  }

  deleteUser(user: User) {
    return this.httpService.postRequest(`user/delete? email=${user.email}`, true);
  }

  getUsers() {
    return this.httpService.postRequest(`user/list`, {});
  }


  getUserDashBoard(investmentId, email) {
    return this.httpService.postRequest(`report/userDashboard?
    investment_id=${investmentId}&user_id=${email}`, null);
  }

  getBankList() {
    return this.httpService.postRequest(`bank/list`, null);
  }

  getusersInvestment(email) {
    return this.httpService.postRequest(`investment_user/listInvestmentOfUser?`, {'user_id': email});
  }

  withdraw(name,email) {
    return this.httpService.postRequest(`investment_user/withdraw`, {'first_name': name,'email':email});
  }

  adminUpdateProfile(user: User): Observable<any> {
    return this.httpService.postRequest(`admin/update_user?
    email=${user.email}&authentication_type=${user.authentication_type}
    &first_name=${user.first_name}&last_name=${user.last_name}
    &user_category=${user.user_category}
    &average_monthly_income=${user.average_monthly_income}
    &phone_number=${user.phone_number}&month_of_birth=${user.month_of_birth}
    &id=${user.id}`, null);
  }

  adminUpdatePreference(user: User): Observable<any> {
    return this.httpService.postRequest(`admin/update_preference?
    updates_on_new_plans=${user.updates_on_new_plans ? 1 : 0}
    &email_updates_on_investment_process=${user.email_updates_on_investment_process ? 1 : 0}
    &user_id=${user.id}`, null);
  }

  adminUpdateBankDetails(user: User): Observable<any> {
    return this.httpService.postRequest(`admin/update_account_detail?
    email=${user.email}
    &first_name=${user.first_name}
    &account_name=${user.account_name}&account_number=${user.account_number}
    &bank_name=${user.bank_name}&user_id=${user.id}`, null);
  }
}
