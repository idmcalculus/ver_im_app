import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {HttpService} from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignInService {
  constructor(
    private httpService:HttpService
  ) { }
  
  login(userCreds:User): Observable<any> {
    return this.httpService.postRequest(`login?email=${userCreds.email}&password=${userCreds.password}`,{});
  }
}
