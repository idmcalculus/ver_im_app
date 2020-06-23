import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'
import { UserComponent } from './user.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';

import {UserRoutingModule} from './user-routing.module';
import { UserSettingsComponent } from './settings/settings.component';
import { EditPasswordComponent } from './settings/edit-password/edit_password.component';
import {FormsModule} from '@angular/forms';
import { UserPoolsComponent } from './user-pool/user-pool.component';
import { UserPoolDetailComponent } from './userpool-detail/userpool-detail.component';
import {SideBarComponent} from './../../shared/components/side-bar/side-bar.component';
import {HeaderComponent} from './../../shared/components/header/header.component';
import {DashboardHeaderComponent} from './../../shared/components/dashboard-header/dashboard-header.component';
import {ReportComponent} from './../../shared/components/report/report.component';
import {ProfileComponent} from './../../shared/components/profile/profile.component'
import {ManageInvestmentComponent} from './../admin/manage-investment/manage-investment.component';
import {ProfileSummaryComponent} from './../../shared/components/profile-summary/profile-summary.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './../../shared/components/chart/chart.component';
import { ChatComponent } from '../chat/chat.component';
import { InvestmentProfileComponent } from './investment-profile/investment-profile.component';
import { MatFormFieldModule, MatSelectModule, MatInputModule, MatMenuModule, MatSidenavModule } from '@angular/material';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    EditPasswordComponent,
    UserComponent,
    UserProfileComponent,
    UserDashboardComponent,
    UserSettingsComponent,
    UserPoolsComponent,
    UserPoolDetailComponent,
    SideBarComponent,
    HeaderComponent,
    DashboardHeaderComponent,
    ReportComponent,
    ManageInvestmentComponent,
    ProfileComponent,
    ProfileSummaryComponent,
    ChartComponent,
    ChatComponent,
    InvestmentProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    FormsModule,
    Angular2PromiseButtonModule,
    ChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    NgxSkeletonLoaderModule
  ],
  exports:[
    UserSettingsComponent,
    ProfileComponent,
    UserPoolsComponent,
    UserPoolDetailComponent,
    SideBarComponent,
    HeaderComponent,
    DashboardHeaderComponent,
    ReportComponent,
    ManageInvestmentComponent,
    UserDashboardComponent,
    ProfileSummaryComponent,
    ChatComponent,
  ]
})
export class UserModule { }
