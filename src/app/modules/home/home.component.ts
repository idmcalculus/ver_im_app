import {Component, OnInit} from '@angular/core';
import {AppAuthService} from './../../core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { CountoDirective } from 'angular2-counto';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    counto_1:number;
    counto_2:number;
    counto_3:number;
    counto_4:number;

    counto1:number =800;
    counto2:number =3;
    counto3:number =240;
    counto4:number =140;

    constructor(
        private activatedRoute: ActivatedRoute,
        private countoMethod: CountoDirective,
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
            entries.forEach(() => {
                this.countoMethod.step = '40';
            });
        }, options);
        observer.observe(target);
    }

    onCountoEnd(): void {
        console.log('counto end');
    }

    ngOnDestroy() {
        this.authService.setInHomeView(false);
    }
}
