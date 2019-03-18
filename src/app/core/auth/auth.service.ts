import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../../shared/models/user';
import {HttpService} from './../http/httpservice.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    private inProfileView : BehaviorSubject<boolean>;
    public currentUser: Observable<User>;
    public profileViewIsActive :Observable<boolean>;

    constructor(private httpService: HttpService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.inProfileView = new BehaviorSubject<boolean>(false);
        this.profileViewIsActive = this.inProfileView.asObservable();
    }

    public get currentUserValue(): any {
      return  new Promise<any>((resolve,reject)=>{
        var userDetails = this.currentUserSubject.value;
        var email = localStorage.getItem('email');
        if(userDetails){
          // console.log('Already existing')
          resolve(userDetails)
        }else{
          this.httpService.postRequest(`fetch_profile?email=${email}`,{})
          .subscribe(response => {
              if (response && response.success) {
                  userDetails = response.success.Data[0];
                  this.currentUserSubject.next(userDetails);
                  // console.log('Fetched again')
                  resolve(userDetails);
              }else{
                resolve(userDetails);
              }
          });
        }
        
      })
    }

    login(userCreds:User) {
      console.log("am sending: "+JSON.stringify(userCreds))
      return this.httpService.postRequest(`login?email=${userCreds.email}&password=${userCreds.password}`,{})
      .pipe(map(response => {
          var userDetails=null;
          if (response && response.success) {
              userDetails = response.success.data;
              localStorage.setItem('token', response.success.token);
              localStorage.setItem('email', userDetails.email);
              this.currentUserSubject.next(userDetails);
              
          }
          return userDetails;
      }));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        console.log('i still have: '+localStorage.getItem('token'))
        this.currentUserSubject.next(null);
    }
}