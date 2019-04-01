import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HomeModule} from './modules/home/home.module';
import {UserModule} from './modules/user/user.module';
import {AdminModule} from './modules/admin/admin.module';
import {InvestmentModule} from './modules/investment/investment.module';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule }    from '@angular/common/http';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { ServicesComponent } from './modules/services/services.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { CareerComponent } from './modules/career/career.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import {VerifyUserComponent} from './shared/components/verify-user/verify-user.component';

import {AuthService} from './core/auth/auth.service';
import {RouterGaurdService} from './core/router-gaurd/router-gaurd';
import {HttpService} from  './core/http/httpservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import {httpInterceptorProviders} from './core/auth/index';
import { ManageUsersComponent } from './modules/admin/manage-users/manage-users.component';
import {ReportComponent} from './shared/components/report/report.component';


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
    CareerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ManageUsersComponent,
    ReportComponent
    // ManageInvestmentComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    InvestmentModule,
    HomeModule,
    UserModule,
    AdminModule,
    AppRoutingModule,
    HttpClientModule,
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
    AuthService,
    CookieService,
    httpInterceptorProviders
  ],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
