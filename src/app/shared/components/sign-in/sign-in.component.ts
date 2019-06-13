import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { User } from '../../models/user';
import { AppAuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
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
        private router: Router,
        private dynamicScriptLoader: DynamicScriptLoaderService,
        private socialLoginService: SocialLogin,
        private toastrService: ToastrService
    ) { }

    ngOnInit() {
        this.installScript();
    }

    signIn(): void {
        this.isSubmitting = new Promise((resolve, reject) => {
            this.loginText = 'Authenticating...';
            const originUrl = window.location.pathname;

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
        localStorage.setItem('social_auth_opr', 'login');
        window.location.href = urll;
    }

    linkedinSignin() {
        const url2 = this.socialLoginService.getSocialUrlLogin('linkedin');
        localStorage.setItem('social_auth_opr', 'login');
        window.location.href = url2;

    }


    installScript() {
        this.dynamicScriptLoader.load('platform')
    }



}
