import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import {VerifyUserComponent} from './shared/components/verify-user/verify-user.component';
import {AboutUsComponent} from './modules/about-us/about-us.component'
import {CareerComponent} from './modules/career/career.component'
import { CareerDetailsComponent } from './modules/career/career-details/career-details.component';
import { CareerApplicationComponent } from './modules/career/career-application/career-application.component';

const appRoutes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'admin/signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'contact', component: SignUpComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'verify_user/:token', component: VerifyUserComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
