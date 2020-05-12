import { Injectable } from '@angular/core';
import {User} from './../../models/user';
import {HttpService} from './../../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignUpService {
  constructor(
    private httpService:HttpService
  ) { }

  register(userCreds: User): Observable<any> {
    userCreds.user_category = userCreds.user_category || 'User';
    return this.httpService.postRequest(`register?email=${userCreds.email}&authentication_type=${userCreds.authentication_type}
    &password=${userCreds.password}&first_name=${userCreds.first_name}&last_name=${userCreds.last_name}
    &user_category=${userCreds.user_category}`, {});
  }

create(user: User): Observable<any> {
    return this.httpService.postRequest(`register?email=${user.email}
    &first_name=${user.first_name}&last_name=${user.last_name}
    &phone_number=${user.phone_number}&gender=${user.gender}
    &home_address=${user.home_address}
    &month_of_birth=${user.month_of_birth}
    &day_of_birth=${user.day_of_birth}&country=${user.country}
    &profile_picture=${user.profile_picture}
    &where_you_work=${user.where_you_work}updates_on_new_plans=${user.updates_on_new_plans ? 1 : 0}
    &email_updates_on_investment_process=${user.email_updates_on_investment_process ? 1 : 0}
    account_name=${user.account_name}&account_number=${user.account_number}
    &bank_name=${user.bank_name}&user_category=${user.user_category}
    &authentication_type=${user.authentication_type}`, {});
  }
}
