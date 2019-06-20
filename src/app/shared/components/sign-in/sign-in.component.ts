import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { User } from '../../models/user';
import { AppAuthService } from './../../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
import { SocialLogin } from '../../services/social-login-services';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    user: User = { email: '', password: '' };
    isSubmitting;
    loginText = 'Login';
    showOTPForm = false;
    otp: string;
    

    constructor(
        private signInService: SignInService,
        private authService: AppAuthService,
        private activatedRoute:ActivatedRoute,
        private dynamicScriptLoader: DynamicScriptLoaderService,
        private socialLoginService: SocialLogin,
        private toastrService: ToastrService,
        private socialAuth:SocialLogin
    ) { 
        this.activatedRoute.queryParams.subscribe(resp=>{
            var authCode = resp.code;
            if(authCode){
                if(authCode.length > 10){
                    this.socialAuth.socialAuth('linkedin',authCode,'login').then(userProfile=>{
                        console.log(JSON.stringify(userProfile))
                        if (userProfile && userProfile.email) {
                            this.showOTPForm = true;
                        }
                    })
                }else{
                    this.socialAuth.socialAuth('yahoo',authCode,'login').then(userProfile=>{
                        console.log(JSON.stringify(userProfile))
                        if (userProfile && userProfile.email) {
                            this.showOTPForm = true;
                        }
                    })
                }
            }
        })
    }

    ngOnInit() {
        this.installScript();
    }

    signIn(): void {
        this.isSubmitting = new Promise((resolve, reject) => {
            this.loginText = 'Authenticating...';

            this.authService.login(this.user)
                .subscribe(UserDetails => {
                    if (UserDetails) {
                        this.showOTPForm = true;
                    }
                    this.loginText = 'Login';
                    resolve();
                });
        });
    }

    validateOTP() {
        this.isSubmitting = new Promise((resolve, reject) => {
            this.loginText = 'Authenticating...';
            const originUrl = window.location.pathname;

            this.authService.validateOTP(this.otp, this.user)
                .subscribe(UserDetails => {
                    if (UserDetails) {
                        console.log("got here")
                        this.showOTPForm = true;
                        this.user = UserDetails;
                        this.toastrService.success(`Welcome ${this.user.first_name}`);
                        // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
                        window.location.href = `${UserDetails.user_category.toLowerCase()}`;
                    }
                    this.loginText = 'Login';
                    resolve();
                });
        });
    }

    googleSignIn() {
        this.signInService.sininWithGoogle()
            .then((authData) => {
                console.log(authData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    socialSignOut() {
        this.socialLoginService.signOut();
    }
   
    
    


    yahooSignin() {
        const urll = this.socialLoginService.getSocialUrlLogin('yahoo');
        this.openSocialWindow(urll);
        
    }

    linkedinSignin() {
        const urll = this.socialLoginService.getSocialUrlLogin('linkedin');
        this.openSocialWindow(urll);
    }

    openSocialWindow(url){
        // if(localStorage.getItem('authCode')){
        //     window.location.href = "/signin?code="+localStorage.getItem('authCode');
        // }else{
            var newwindow=window.open(url,"windowName",'height=700,width=600');
            if (window.focus) {newwindow.focus()}
        // }
    }


    installScript() {
        this.dynamicScriptLoader.load('platform')
    }



}
