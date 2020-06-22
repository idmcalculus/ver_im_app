import {Component, OnInit} from '@angular/core';
import {AppAuthService} from './../../core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    counto_1:number;
    counto_2:number;
    counto_3:number;
    counto_4:number;

    counto1: number;
    counto2: number;
    counto3: number;
    counto4: number;

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

        const options = {
            root: null,
            threshold: 0.25, // 0 - 1 this work as a trigger.
            rootMargin: '150px'
        };

        const target = document.querySelector('#countDown');
        const observer = new IntersectionObserver(
           entries => { // each entry checks if the element is the view or not and if yes trigger the function accordingly
            const rect = target.getBoundingClientRect();

            if( rect.bottom > 0 &&
                rect.right > 0 &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
                rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */) {

                    entries.forEach(() => {
                        this.counto1 = 158;
                        this.counto2 = 3;
                        this.counto3 = 50;
                        this.counto4 = 36;
                    });  }
        }, options);
        observer.observe(target);
    }

    ngOnDestroy() {
        this.authService.setInHomeView(false);
    }
}
