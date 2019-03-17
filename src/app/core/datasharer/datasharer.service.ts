import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserSession} from '../../shared/models/UserSession';
import {User} from '../../shared/models/User';
import { CookieService } from 'ngx-cookie-service';
import {HttpService} from './../http/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class DatasharerService {
  private session = new BehaviorSubject<any>(new UserSession());
  private user = new BehaviorSubject<any>(new User());
  private inProfileView = new BehaviorSubject<boolean>(false);
  userSession = this.session.asObservable();
  userProfile = this.user.asObservable();
  profileViewIsActive = this.inProfileView.asObservable();
  constructor(
    private cookieService:CookieService,
    private httpService:HttpService
    ) {}

  
  setSession(userSession: UserSession) {
    this.session.next(userSession)
  }

  setUserProfile(user: User) {
    this.user.next(user)
  }

  setInProfileView(profileViewIsActive:boolean){
    this.inProfileView.next(profileViewIsActive)
  }


  getAuthorizationToken() {
    return this.cookieService.get('token');
  }

  getEmail(){
    return this.cookieService.get('email');
  }



 




}
