import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../../shared/models/user';
import { HttpService } from './../http/httpservice.service';
import { Router } from '@angular/router';
import { Investment } from 'src/app/shared/models/Investment';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AppAuthService {
    private currentUserSubject: BehaviorSubject<User>;
    private inProfileView: BehaviorSubject<boolean>;
    private inHomePage: BehaviorSubject<boolean>;
    private managePlanOperation: BehaviorSubject<Investment>;
    public currentUser: Observable<User>;
    public profileViewIsActive: Observable<boolean>;
    public homeViewIsActive: Observable<boolean>;
    public currentManagePlanOperation: Observable<Investment>;
    userDetail: any;

    constructor(
        private httpService: HttpService,
        private router: Router,
        private toastrService: ToastrService
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.inHomePage = new BehaviorSubject<boolean>(null);
        this.homeViewIsActive = this.inHomePage.asObservable();

        this.inProfileView = new BehaviorSubject<boolean>(false);
        this.profileViewIsActive = this.inProfileView.asObservable();

        this.managePlanOperation = new BehaviorSubject<Investment>(null);
        this.currentManagePlanOperation = this.managePlanOperation.asObservable();


    }

    validateSession(): any {
        return new Promise<any>((resolve, reject) => {
            let userDetails = this.currentUserSubject.value;
            if (userDetails) {
                resolve(userDetails);
            } else {
                const email = localStorage.getItem('email');
                if (!email) {
                    resolve(null);
                } else {
                    this.httpService.postRequest(`fetch_profile?email=${email}`, {}, null)
                        .subscribe(response => {
                            if (response && response.success) {
                                const resp = response.success.Data.user[0];
                                userDetails = resp;
                                userDetails.updates_on_new_plans = resp.updates_on_new_plans === '1' ? true : false;
                                userDetails.email_updates_on_investment_process = resp.email_updates_on_investment_process == '1' ? true : false;
                                // console.log('Fetched again '+JSON.stringify(userDetails))
                                this.currentUserSubject.next(userDetails);
                                resolve(userDetails);
                            } else {
                                resolve(userDetails);
                            }
                        });
                }
            }
        });
    }


    public get currentUserValue(): any {
        const userUrl = window.location.pathname;
        if (!localStorage.getItem('email') || !localStorage.getItem('token') || !localStorage.getItem('userType')) {
            this.toastrService.error(`Kindly Login First`)
            this.router.navigate(['/signin'], {});
            return false;
        } else {
            const token = localStorage.getItem('token');
            const tokenPayload = decode(token);
            console.log(tokenPayload)
            var actualUser = localStorage.getItem('userType').toLowerCase();
            if(!userUrl.includes(actualUser)){
                alert('Sorry You are not authorized to view this page')//unauthorized
                window.location.href = `${actualUser}`;
                return false
            }else if(tokenPayload.exp < new Date().getTime()/1000){
                alert('Sorry Your session as expired, kindly log in again')//unauthorized
                window.location.href = `/signin`;
                return false
            }else{
                return true;
            }

        }
    }

    validateOTP(userOTP: string, userCreds: User) {
        return this.httpService.postRequest(`user/validate_otp?otp=${userOTP}`, {})
            .pipe(map(response => {
                let userDetails = null;
                if (response && response.success) {
                    // userDetails = relogin();
                    userDetails = response.success.data;
                }
                return userDetails;
            }));
    }

    login(userCreds: User) {
        return this.httpService.postRequest(`login?email=${userCreds.email}&password=${userCreds.password}`, {}, null)
            .pipe(map(response => {
                this.userDetail = null;
                if (response && response.success) {
                    this.userDetail = response.success;
                    localStorage.setItem('token', response.success.token);
                    /**
                     * Below keys not sent again, OTP is sent to mail instead
                     */
                    // localStorage.setItem('email', userDetails.email);
                    // localStorage.setItem('userType', userDetails.user_category);
                }
                return this.userDetail;
            }));
    }

    socialLogin(userCreds: User) {
        // console.log("Social login recieved :: "+JSON.stringify(userCreds))
        return this.httpService.postRequest(`login?email=${userCreds.email}`, {}, null)
            .pipe(map(response => {
                let userDetails = null;
                if (response && response.success) {
                    userDetails = response.success.data;
                    this.userDetail = response.success;
                    localStorage.setItem('temp_token', response.success.token);
                    localStorage.setItem('temp_email', userDetails.email);
                    localStorage.setItem('temp_userType', userDetails.user_category);
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

    setInProfileView(isLoggedIn: boolean) {
        this.inProfileView.next(isLoggedIn);
    }

    setInHomeView(homeViewIsActive: boolean) {
        this.inHomePage.next(homeViewIsActive);
    }

    setCurrentPlanOperation(operation: Investment) {
        this.managePlanOperation.next(operation);
    }

    setUser(userDetails: User) {
        this.currentUserSubject.next(userDetails);
    }
}
