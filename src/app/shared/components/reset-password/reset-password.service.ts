import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {HttpService} from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {
  constructor(
    private httpService:HttpService
  ) { }
  
  reset(password:String): Observable<any> {
    return this.httpService.postRequest(`change_password?password=${password}`,{});
  }
}
