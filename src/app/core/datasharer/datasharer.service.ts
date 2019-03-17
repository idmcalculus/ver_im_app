import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserSession} from '../../shared/models/UserSession';
import { CookieService } from 'ngx-cookie-service';
import {HttpService} from './../http/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class DatasharerService {
  private session = new BehaviorSubject<any>(new UserSession());
  private inProfileView = new BehaviorSubject<boolean>(false);
  userSession = this.session.asObservable();
  profileViewIsActive = this.inProfileView.asObservable();
  constructor(
    private cookieService:CookieService,
    private httpService:HttpService
    ) { }

  
  setSession(userSession: UserSession) {
    this.session.next(userSession)
  }

  getSession(){
    // console.log('token is: '+this.cookieService.get('token'));
    if(this.cookieService.get('token') && this.cookieService.get('email')){
      this.httpService.postRequest(`fetch_profile?email=${this.cookieService.get('email')}`,null)
      .subscribe(resp=>{
          if(resp){
            return resp.success.data;
          }
      })
      return {isValid:true,email:'owow',password:'owo'};
    }
  }

  setInProfileView(profileViewIsActive:boolean){
    this.inProfileView.next(profileViewIsActive)
  }

  getInProfileView(){
    return this.profileViewIsActive;
  }


}
