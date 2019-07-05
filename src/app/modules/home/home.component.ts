import {Component, OnInit} from '@angular/core';
import {AppAuthService} from './../../core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SocialLogin} from '../../shared/services/social-login-services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AppAuthService,
        private socialAuth: SocialLogin
    ) {
        this.route.queryParams.subscribe(resp => {
            var authCode = resp.code;
            var operation = localStorage.getItem('social_auth_opr');
            if (authCode) {
                if (authCode.length > 10) {
                    this.socialAuth.socialAuth('linkedin', authCode, operation);
                } else {
                    this.socialAuth.socialAuth('yahoo', authCode, operation);
                }
            }
        });
    }


    ngOnInit() {
        this.authService.setInHomeView(true);
    }

    ngOnDestroy() {
        this.authService.setInHomeView(false);
    }
}
