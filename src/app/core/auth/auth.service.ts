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

    validateSession(): any {
      return  new Promise<any>((resolve,reject)=>{
        var userDetails = this.currentUserSubject.value;
        if(userDetails){
            resolve(userDetails);
        }else{
            var email = localStorage.getItem('email');
            this.httpService.postRequest(`fetch_profile?email=${email}`,{})
                    .subscribe(response => {
                        if (response && response.success) {
                            userDetails = response.success.Data[0];
                            this.currentUserSubject.next(userDetails);
                            console.log('Fetched again')
                            resolve(userDetails);
                        }else{
                          resolve(userDetails);
                        }
                    });
        }
        
        
      })
    }

    public get currentUserValue(): any {
        if(!localStorage.getItem('email') || !localStorage.getItem('token')){
            return null
        }else{
            //  this.validateSession().then(resp=>{
            //     return resp;
            //  })
            return true;
        }
    }



    login(userCreds:User) {
    //   console.log("am sending: "+JSON.stringify(userCreds))
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
        this.setInProfileView(false)
        this.currentUserSubject.next(null);
    }

    setInProfileView(isLoggedIn:boolean){
        this.inProfileView.next(isLoggedIn);
    }

    setUser(userDetails:User){
        this.currentUserSubject.next(userDetails);
    }
}