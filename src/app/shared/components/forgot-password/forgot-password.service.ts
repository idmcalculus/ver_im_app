import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {HttpService} from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  constructor(
    private httpService:HttpService
  ) { }
  
  recoverPassword(userEmail:String): Observable<any> {
    return this.httpService.postRequest(`reset_password_request?email=${userEmail}`,{});
  }
}
