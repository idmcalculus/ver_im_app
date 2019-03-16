import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HomeModule} from './modules/home/home.module';
import {InvestmentModule} from './modules/investment/investment.module';
import {ProfileModule} from './modules/profile/profile.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HeaderLogoComponent } from './shared/components/header/header-logo/header-logo.component';
import { HeaderBtnComponent } from './shared/components/header/header-btn/header-btn.component';
import { HeaderIconNavComponent } from './shared/components/header/header-icon-nav/header-icon-nav.component';
import { HeaderTextNavComponent } from './shared/components/header/header-text-nav/header-text-nav.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { ServicesComponent } from './modules/services/services.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { CareerComponent } from './modules/career/career.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { HttpClientModule }    from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './core/mocks/in-memory-data.service';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';
import {VerifyUserComponent} from './shared/components/verify-user/verify-user.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HeaderLogoComponent,
    HeaderBtnComponent,
    HeaderIconNavComponent,
    HeaderTextNavComponent,
    SignInComponent,
    SignUpComponent,
    VerifyUserComponent,
    ServicesComponent,
    AboutUsComponent,
    CareerComponent,
    SideBarComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InvestmentModule,
    HomeModule,
    ProfileModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
