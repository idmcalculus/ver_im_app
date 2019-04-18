import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../../shared/models/user';
import {HttpService} from './../http/httpservice.service';
import {Router} from '@angular/router';
import { Investment } from 'src/app/shared/models/Investment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    private inProfileView : BehaviorSubject<boolean>;
    private managePlanOperation : BehaviorSubject<Investment>;
    public profileViewIsActive :Observable<boolean>;
    public currentUser: Observable<User>;
    public currentManagePlanOperation: Observable<Investment>;

    constructor(
        private httpService: HttpService,
        private router:Router
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.inProfileView = new BehaviorSubject<boolean>(false);
        this.profileViewIsActive = this.inProfileView.asObservable();
        
        this.managePlanOperation = new BehaviorSubject<Investment>(null);
        this.currentManagePlanOperation = this.managePlanOperation.asObservable();

        
    }

    validateSession(): any {
      return  new Promise<any>((resolve,reject)=>{
        var userDetails = this.currentUserSubject.value;
        if(userDetails){
            resolve(userDetails);
        }else{
            var email = localStorage.getItem('email');
            if(!email){
                resolve(null);
            }
            this.httpService.postRequest(`fetch_profile?email=${email}`,{})
                    .subscribe(response => {
                        if (response && response.success) {
                            userDetails = response.success.Data.user[0];
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
        let userUrl = window.location.pathname;
        if(!localStorage.getItem('email') || !localStorage.getItem('token') || !localStorage.getItem('userType')){
            alert('Kindly Login First')//unauthenticated
            this.router.navigate(['/signin'], {});
            return false
        }else{
            // var actualUser = localStorage.getItem('userType').toLowerCase();
            // if(!userUrl.includes(actualUser)){
            //     alert('Sorry You are not authorized to view this page')//unauthorized
            //     window.location.href = `${actualUser}`;
            //     return false
            // }else{
                return true;
            // }
            
        }
    }



    login(userCreds:User) {
      return this.httpService.postRequest(`login?email=${userCreds.email}&password=${userCreds.password}`,{})
      .pipe(map(response => {
          var userDetails=null;
          if (response && response.success) {
            userDetails = response.success.data;
            localStorage.setItem('token', response.success.token);
            localStorage.setItem('email', userDetails.email);
            localStorage.setItem('userType', userDetails.user_category);
            this.currentUserSubject.next(userDetails);
          }
          return userDetails;
      }));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('userType');
        this.setInProfileView(false)
        this.currentUserSubject.next(null);
    }

    setInProfileView(isLoggedIn:boolean){
        this.inProfileView.next(isLoggedIn);
    }

    setCurrentPlanOperation(operation:Investment){
        this.managePlanOperation.next(operation);
    }

    setUser(userDetails:User){
        this.currentUserSubject.next(userDetails);
    }
}