import {Component, OnInit} from '@angular/core';
import {AppAuthService} from './../../core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AppAuthService,
    ) {
        this.activatedRoute.queryParams.subscribe(resp => {
            let authCode = resp.code;
            let error = resp.error;
            if (authCode) {
                let oprType = localStorage.getItem('socialAuthOpr');
                opener.document.location = '/' + oprType + '?code=' + authCode;
                window.close();
            } else if (error) {
                window.close();
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
