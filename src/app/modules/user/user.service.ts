import { Injectable } from '@angular/core';
import {HttpService} from './../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private httpService:HttpService
  ) { }
  
  getProfileDetails(email:string): Observable<any> {
    return this.httpService.postRequest(`fetch_profile?email=${email}`,null);
  }

  updateProfile(user:User):Observable<any>{
    return this.httpService.postRequest(`update_user?
    email=${user.email}&authentication_type=${user.authentication_type}
    &first_name=${user.first_name}&last_name=${user.last_name}
    &phone_number=${user.phone_number}&gender=${user.gender}
    &user_category=${user.user_category}&home_address=${user.home_address}
    &month_of_birth=${user.month_of_birth}
    &day_of_birth=${user.day_of_birth}&country=${user.country}
    &account_name=${user.account_name}&bank_name=${user.bank_name}
    &account_number=${user.account_number}&updates_on_new_plans=${user.updates_on_new_plans}`,null);
  }

  updatePreference(user:User):Observable<any>{
    return this.httpService.postRequest(`update_preference?
    updates_on_new_plans=${user.updates_on_new_plans}
    &email_updates_on_investment_process=${user.email_updates_on_investment_process}`,null);
  }

  updateBankDetails(user:User):Observable<any>{
    return this.httpService.postRequest(`update_account_detail?
    account_name=${user.account_name}&account_number=${user.account_number}
    &bank_name=${user.bank_name}`,null);
  }


}
