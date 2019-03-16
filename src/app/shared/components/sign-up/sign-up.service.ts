import { Injectable } from '@angular/core';
import {User} from './../../models/User';
import {HttpService} from './../../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignUpService {
  constructor(
    private httpService:HttpService
  ) { }
  
  register(userCreds:User): Observable<any> {
    userCreds.authentication_type = 'E';
    userCreds.user_category = 'User';
    return this.httpService.postRequest(`register?email=${userCreds.email}&authentication_type=${userCreds.authentication_type}&password=${userCreds.password}&first_name=${userCreds.first_name}&last_name=${userCreds.last_name}&user_category=${userCreds.user_category}`,{});
  }
}
