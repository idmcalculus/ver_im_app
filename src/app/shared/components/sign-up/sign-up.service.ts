import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {HttpService} from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignUpService {
  constructor(
    private httpService:HttpService
  ) { }
  
  register(userCreds:User): Observable<any> {
    return this.httpService.postRequest("register?email=owolabi.sunday@yahoo.com&authentication_type=E&password=password&first_name=Owolabi&last_name=Sunny&user_category=Admin",{});
  }
}
