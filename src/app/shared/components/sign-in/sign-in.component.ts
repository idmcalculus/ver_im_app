import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { User } from '../../models/user';
import { AppAuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
import { SocialLogin } from '../../services/social-login-services';
import { ToastrService } from 'ngx-toastr';

let linkedinUrl = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77pv3mo63oyixv&redirect_uri=http://127.0.0.1:4200&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social';
let yahooUrl = 'https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9Y0lNZ2pVNTRTSzhGJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWY2&redirect_uri=http://versa-ims.herokuapp.com&response_type=code&language=en-us';


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
                        this.showOTPForm = true;
                        this.user = UserDetails;
                        this.toastrService.success(`Welcome ${this.user.first_name}`);
                        console.log(UserDetails);
                        alert();
                        // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
                        window.location.href = `${UserDetails.user_category.toLowerCase()}`;
                    }
                    this.loginText = 'Login';
                    resolve();
                });
        });
    }

    socialSignIn() {
        this.socialLoginService.googleInit();
    }

    socialSignOut() {
        this.socialLoginService.signOut();
    }


    yahooSignin() {
        const urll = this.socialLoginService.getSocialUrlLogin('yahoo');
        window.location.href = urll;
    }

    linkedinSignin() {
        const url2 = this.socialLoginService.getSocialUrlLogin('linkedin');
        window.location.href = url2;

    }


    // public socialLogin(provider){
    //   alert(provider)
    //   this.social_auth.login(provider).subscribe(
    //     (data) => {
    //                 console.log(data);
    //                 //user data
    //                 //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google)
    //               }
    //   )
    // }

    installScript() {
        this.dynamicScriptLoader.load('platform')
    }



}
