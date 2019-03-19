import { Injectable } from '@angular/core';
import {HttpService} from './../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private httpService:HttpService
  ) { }
  
  getProfileDetails(email:string): Observable<any> {
    return this.httpService.postRequest(`fetch_profile?email=${email}`,null);
  }

  updateProfile(user:User):Observable<any>{
    return this.httpService.postRequest(`update_user?email=${user.email}&authentication_type=${user.authentication_type}&first_name=${user.first_name}&last_name=${user.last_name}
    &phone_number=${user.phone_number}&gender=${user.gender}&user_category=${user.user_category}`,null);
  }
}
