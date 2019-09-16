import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { CareerModule } from './modules/career/career.module';
import { AppRoutingModule } from './app-routing.module';
// import { Angular2SocialLoginModule } from "angular2-social-login";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { ServicesComponent } from './modules/services/services.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { VerifyUserComponent } from './shared/components/verify-user/verify-user.component';

import { AppAuthService } from './core/auth/auth.service';
import { RouterGaurdService } from './core/router-gaurd/router-gaurd';
import { HttpService } from './core/http/httpservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { httpInterceptorProviders } from './core/auth/index';
import { AdminProfileComponent } from './modules/admin/admin-profile/admin-profile.component';
import { TableComponent } from './shared/components/table/table.component';
import { CloudinaryService } from './shared/services/cloudinary.service';
import { DynamicScriptLoaderService } from './shared/services/dynamic-script-loader.service';
import { SocialLogin } from './shared/services/social-login-services';
import { HowitworksComponent } from './pages/howitworks/howitworks.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactusComponent } from './pages/contactus/faq.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { ChatComponent } from './modules/chat/chat.component';
// import { ApplicantDetailsComponent } from './modules/career/applicant-details/applicant-details.component';


// let social_providers = {
//   "google": {
//     "clientId": "104742513131-r6pnjt53en8akmt4pqt9d3i5ia5iln8a.apps.googleusercontent.com"
//   },
//   "linkedin": {
//     "clientId": "77pv3mo63oyixv"
//   },
//   "facebook": {
//     "clientId": "FACEBOOK_CLIENT_ID",
//     "apiVersion": "<version>" //like v2.4
//   }
// };

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        PageNotFoundComponent,
        SignInComponent,
        SignUpComponent,
        VerifyUserComponent,
        ServicesComponent,
        AboutUsComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        AdminProfileComponent,
        TableComponent,
        HowitworksComponent,
        FaqComponent,
        ContactusComponent,
        // ChatComponent,
        // ApplicantDetailsComponent

    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        BrowserModule,
        FormsModule,
        InvestmentModule,
        HomeModule,
        UserModule,
        AdminModule,
        CareerModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSkeletonLoaderModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        // Angular2SocialLoginModule,
        Angular2PromiseButtonModule.forRoot({
            spinnerTpl: '<span class="btn-spinner"></span>',
            disableBtn: true,
            btnLoadingClass: 'is-loading',
            handleCurrentBtnOnly: false,
        })
        // HttpClientInMemoryWebApiModule.forRoot(
        //   InMemoryDataService, { dataEncapsulation: false }
        // )
    ],
    providers: [
        RouterGaurdService,
        HttpService,
        AppAuthService,
        CookieService,
        httpInterceptorProviders,
        CloudinaryService,
        DynamicScriptLoaderService,
        SocialLogin
    ],
    exports: [],
    bootstrap: [AppComponent]
})


export class AppModule { }

// Angular2SocialLoginModule.loadProvidersScripts(social_providers);
