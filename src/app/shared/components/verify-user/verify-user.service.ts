import { Injectable } from '@angular/core';
import {HttpService} from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VerifyUserService {
  constructor(
    private httpService:HttpService
  ) { }
  
  verify(token:string): Observable<any> {
    var urlParams = `verify_user/${token}`;
    return this.httpService.getRequest(urlParams);
  }
}
