import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { User } from './../../models/user';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
import { ToastrService } from 'ngx-toastr';
import { SocialLogin } from '../../services/social-login-services';

let userBackbone = { email: '', password: '' };
declare const gapi: any;

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    @ViewChild('passText') input;
    @ViewChild('confirmPassText') input2;
    public auth2: any;
    user: User = userBackbone;
    passwordConfim: string = '';
    isSubmitting;
    signUpText: string = 'Sign up';
    showOTPForm: boolean = false;
    otp: any;
    private _shown = false;

    constructor(private signUpService: SignUpService,
        private authService: AppAuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dynamicScriptLoader: DynamicScriptLoaderService,
        private toastrService: ToastrService,
        private socialLoginService: SocialLogin
    ) {
        this.activatedRoute.queryParams.subscribe(resp => {
            var authCode = resp.code;
            if (authCode) {
                if (authCode.length > 10) {
                    this.socialLoginService.socialAuth('linkedin', authCode, 'login').then(userProfile => {
                        console.log(JSON.stringify(userProfile));
                        if (userProfile && userProfile.email) {
                            this.showOTPForm = true;
                        }
                    });
                } else {
                    this.socialLoginService.socialAuth('yahoo', authCode, 'login').then(userProfile => {
                        console.log(JSON.stringify(userProfile));
                        if (userProfile && userProfile.email) {
                            this.showOTPForm = true;
                        }
                    });
                }
            }
        });
    }

    ngOnInit() {
        this.installScript();
    }


    signUp(): void {
        if (this.passwordConfim == this.user.password) {
            this.isSubmitting = new Promise((resolve, reject) => {
                this.signUpText = 'Submitting...';
                this.user.authentication_type = 'E';
                this.signUpService.register(this.user)
                    .subscribe(UserDetails => {
                        if (UserDetails) {
                            this.toastrService.success('Registeration Succesfull, check mail to verify');
                            this.user = { email: '', password: '' };
                            this.router.navigateByUrl('signin');
                        }
                        this.passwordConfim = '';
                        this.signUpText = 'Register';
                        resolve();
                    });
            });
        } else {
            // alert('Passwords do not match');
            this.toastrService.error('Passwords do not match');
        }

    }

    public googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '104742513131-r6pnjt53en8akmt4pqt9d3i5ia5iln8a.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
            this.attachSignin(document.getElementById('googleBtn'));
        });
    }

    public attachSignin(element) {
        this.auth2.attachClickHandler(element, {},
            (googleUser) => {

                let profile = googleUser.getBasicProfile();
                var socialUser = {
                    last_name: profile.getName().split(' ')[1],
                    email: profile.getEmail(),
                    first_name: profile.getName().split(' ')[0],
                    user_category: 'User',
                    authentication_type: 'G'
                };
                this.signUpService.register(socialUser)
                    .subscribe(UserDetails => {
                        if (UserDetails) {
                            this.authService.login(socialUser)
                                .subscribe(UserDetails => {
                                    if (UserDetails) {
                                        this.user = UserDetails;
                                        this.toastrService.success(`Welcome ${this.user.first_name}`);
                                        window.location.href = `${UserDetails.user_category.toLowerCase()}`;
                                    }
                                });
                        }
                        this.passwordConfim = '';
                    });


            }, (error) => {
            });
    }

    validateOTP() {
        this.isSubmitting = new Promise((resolve, reject) => {
            this.signUpText = 'Authenticating...';

            this.authService.validateOTP(this.otp, this.user)
                .subscribe(UserDetails => {
                    if (UserDetails) {
                        // console.log("got here")
                        this.showOTPForm = true;
                        this.user = UserDetails;
                        this.toastrService.success(`Welcome ${this.user.first_name}`);

                        localStorage.setItem('token', localStorage.getItem('temp_token'));
                        localStorage.setItem('email', localStorage.getItem('temp_email'));
                        localStorage.setItem('userType', localStorage.getItem('temp_userType'));

                        // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
                        window.location.href = `${UserDetails.user_category.toLowerCase()}`;
                    }
                    this.signUpText = 'Register';
                    resolve();
                });
        });
    }

    toggle(span) {
        this._shown = !this._shown;
        if (this._shown) {
            this[span].nativeElement.setAttribute('type', 'text');
        } else {
            this[span].nativeElement.setAttribute('type', 'password');
        }
    }

    view(input) {
        this.toggle(input);
    }

    yahooSignUp() {
        const urll = this.socialLoginService.getSocialUrlLogin('yahoo');
        this.openSocialWindow(urll);
    }

    linkedinSignUp() {
        const url2 = this.socialLoginService.getSocialUrlLogin('linkedin');
        this.openSocialWindow(url2);

    }

    openSocialWindow(url) {

        localStorage.setItem('socialAuthOpr', 'signup');
        var newwindow = window.open(url, 'windowName', 'height=700,width=600');
        if (window.focus) {
            newwindow.focus();
        }
    }


    installScript() {
        this.dynamicScriptLoader.load('platform');
    }

}
