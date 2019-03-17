import { Injectable } from '@angular/core';
import {User} from './../../shared/models/User';
import {HttpService} from './../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private httpService:HttpService
  ) { }
  
  getProfileDetails(email:string): Observable<any> {
    return this.httpService.postRequest(`fetch_profile?email=${email}`,null);
  }
}
