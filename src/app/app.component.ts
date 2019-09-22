import {Component} from '@angular/core';
import {AppAuthService} from './core/auth/auth.service';
import {Subscription} from 'rxjs';
import {User} from './shared/models/user';
import {DynamicScriptLoaderService} from './shared/services/dynamic-script-loader.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    title = 'versaim-app';
    showHeader: boolean = true;
    showFooter: boolean = true;
    homeViewIsActive: boolean = true;
    activeUser: User = {user_category: 'none', email: ''};

    inProfileSubcription: Subscription;
    // inHomeView: Subscription;
    hasSession: Subscription;

    constructor(
        private authService: AppAuthService,
        private dynamicScriptLoader: DynamicScriptLoaderService,
        private router: Router
    ) {
        this.inProfileSubcription = this.authService.profileViewIsActive.subscribe(inDashboardView => {
            this.showHeader = !inDashboardView;
            this.showFooter = !inDashboardView;
            this.installScripts(inDashboardView);
        });

        // this.inHomeView = this.authService.homeViewIsActive.subscribe(homeViewIsActive =>{
        //   if(homeViewIsActive==null){
        //     this.homeViewIsActive = false;
        //   }else{
        //     this.homeViewIsActive = homeViewIsActive;
        //   }
        //   console.log("now :: "+this.homeViewIsActive)
        // })
    }

    ngOnInit() {
        this.authService.validateSession().then(resp => {
            if (resp && resp.email) {
                this.activeUser = resp;
                this.authService.setUser(this.activeUser);
            }
        });
    }

    ngOnDestroy() {
        this.inProfileSubcription.unsubscribe();
        this.hasSession.unsubscribe();
    }

    installScripts(inDashBoard) {
        if (inDashBoard) {
            this.dynamicScriptLoader.load('bootstrap', 'chartjs', 'p-coded', 'v-layout',
                'slimscroll', 'dash', 'platform', 'data-table', 'flat-pickr', 'g-maps');
        }

    }

    isValid = (): boolean => {
        console.log(this.router.url)
        if (this.router.url === '/forgot-password') {
            this.showHeader = false;
            this.showFooter = false;
        }
        // console.log(this.router);
        if ((this.router.url !== '/signin') 
        && (this.router.url !== '/signup')
        ) {
            return true;
        }
        return false;

    }
}
