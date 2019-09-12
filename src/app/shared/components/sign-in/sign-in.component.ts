import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SignInService } from './sign-in.service';
import { User } from '../../models/user';
import { AppAuthService } from './../../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
import { SocialLogin } from '../../services/social-login-services';
import { ToastrService } from 'ngx-toastr';
import actions from '@angular/fire/schematics/deploy/actions';


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    @ViewChild('passText') input;
    user: User = { email: '', password: '' };
    isSubmitting;
    loginText = 'Login';
    showOTPForm = false;
    otp: string;
    isLoading: boolean = false;
    private _shown = false;

    constructor(
        private signInService: SignInService,
        private authService: AppAuthService,
        private activatedRoute: ActivatedRoute,
        private dynamicScriptLoader: DynamicScriptLoaderService,
        private socialLoginService: SocialLogin,
        private toastrService: ToastrService,
        private socialAuth: SocialLogin,
        private router: Router,
        private el: ElementRef
    ) {
        this.activatedRoute.queryParams.subscribe(resp => {
            var authCode = resp.code;
            if (authCode) {
                this.isLoading = true;
                if (authCode.length > 10) {
                    this.socialAuth.socialAuth('linkedin', authCode, 'login').then(userProfile => {
                        console.log(JSON.stringify(userProfile));
                        if (userProfile && userProfile.email) {
                            this.showOTPForm = true;
                            this.isLoading = false;
                        }
                    }).catch(err => {
                        console.log('isshs :: ' + err);
                        this.isLoading = false;
                    });
                } else {
                    this.socialAuth.socialAuth('yahoo', authCode, 'login').then(userProfile => {
                        console.log(JSON.stringify(userProfile));
                        if (userProfile && userProfile.email) {
                            this.showOTPForm = true;
                            this.isLoading = false;
                        }
                    }).catch(err => {
                        console.log('isshs :: ' + err);
                        this.isLoading = false;
                    });
                }
            }
        });
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

                        this.showOTPForm = true;
                        this.user = UserDetails;

                        localStorage.setItem('email', UserDetails.email);
                        localStorage.setItem('userType', UserDetails.user_category);


                        this.toastrService.success(`Welcome ${this.user.first_name}`);
                        // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());

                        window.location.href = `${UserDetails.user_category.toLowerCase()}`;
                    }
                    this.loginText = 'Login';
                    resolve();
                });
        });
    }


    socialSignOut() {
        this.socialLoginService.signOut();
    }

    gotoSignup() {
        return this.router.navigate(['/signup']);
    }

    googleSignIn() {
        this.signInService.sininWithGoogle()
            .then((authData) => {
                console.log('i gat :: ' + authData);
                this.showOTPForm = true;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    toggle(span: HTMLElement) {
        this._shown = !this._shown;
        console.log(this._shown);
        if (this._shown) {
            this.input.nativeElement.setAttribute('type', 'text');
        } else {
            this.input.nativeElement.setAttribute('type', 'password');
        }
    }

    view() {
        this.toggle(this.input.nativeElement);
    }

    yahooSignin() {
        const urll = this.socialLoginService.getSocialUrlLogin('yahoo');
        this.openSocialWindow(urll);

    }

    linkedinSignin() {
        const urll = this.socialLoginService.getSocialUrlLogin('linkedin');
        this.openSocialWindow(urll);
    }

    openSocialWindow(url) {
        localStorage.setItem('socialAuthOpr', 'signin');
        var newwindow = window.open(url, 'windowName', 'height=700,width=600');
        if (window.focus) {
            newwindow.focus();
        }
    }

    installScript() {
        this.dynamicScriptLoader.load('platform');
    }
}
