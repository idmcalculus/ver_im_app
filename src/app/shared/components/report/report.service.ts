import { Injectable } from '@angular/core';
import {Report} from '../../models/Report';
import {HttpService} from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignInService {
  constructor(
    private httpService:HttpService
  ) { }
  
//   createReport(report:Report): Observable<any> {
//     http://localhost:8000/api/report/create?title=Driver
//     UPDATE

// http://localhost:8000/api/report/update?title=Driver delivered 2&description=We're connecting riders with the best local drivers at the best prices. When you ride with Bolt, we do our best to make the ride as seamless and comfortable as possible.&investment_id=2&report_id=1
//     return this.httpService.postRequest(`report/create?email=${userCreds.email}&password=${userCreds.password}`,{});
//   }
}
