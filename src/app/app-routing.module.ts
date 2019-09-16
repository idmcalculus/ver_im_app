import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SignInComponent} from './shared/components/sign-in/sign-in.component';
import {SignUpComponent} from './shared/components/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './shared/components/forgot-password/forgot-password.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {VerifyUserComponent} from './shared/components/verify-user/verify-user.component';
import {AboutUsComponent} from './modules/about-us/about-us.component';
import {ResetPasswordComponent} from './shared/components/reset-password/reset-password.component';
import {HowitworksComponent} from './pages/howitworks/howitworks.component';
import {FaqComponent} from './pages/faq/faq.component';
import { ContactusComponent } from './pages/contactus/faq.component';
import {CareerComponent} from './modules/career/career.component';
import {InvestmentComponent} from './modules/investment/investment.component';
// import {ChatComponent} from './modules/chat/chat.component';

const appRoutes: Routes = [
    {path: 'signin', component: SignInComponent},
    {path: 'admin/signin', component: SignInComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'howitworks', component: HowitworksComponent},
    {path: 'contactus', component: ContactusComponent },
    {path: 'investments', component: InvestmentComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'verify_user/:token', component: VerifyUserComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'reset_password_request/:token', component: ResetPasswordComponent},
    {path: 'career', component: CareerComponent},
    {path: '**', component: PageNotFoundComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        scrollPositionRestoration: 'enabled', // Add options right here
    }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
