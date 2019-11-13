import { Injectable } from '@angular/core';
import {HttpService} from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { Report } from '../../models/Report';

@Injectable({ providedIn: 'root' })
export class addUserService {
  constructor(
    private httpService:HttpService
  ) { }
  
  addUser(Details):any {
    return this.httpService.postRequest(`investment_user/create?investment_id=${Details.investment_id}
    &number_of_pools=${Details.number_of_pools}&amount_paid=${Details.amount_paid}
    &payment_reference=${Details.payment_reference}&user_email=${Details.user_email}`,null);
  }
}
