import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';

import {UserRoutingModule} from './user-routing.module';
import { UserSettingsComponent } from './settings/settings.component';
import {FormsModule} from '@angular/forms';
import { PoolsComponent } from './pools/pools.component';
import { PoolDetailComponent } from './pool-detail/pool-detail.component';
import {SideBarComponent} from './../../shared/components/side-bar/side-bar.component';
import {HeaderComponent} from './../../shared/components/header/header.component';
import {DashboardHeaderComponent} from './../../shared/components/dashboard-header/dashboard-header.component';
import {ReportComponent} from './../../shared/components/report/report.component';
import {AddUserComponent} from './../../shared/components/addUserToPool/addUser.component';
import {ProfileComponent} from './../../shared/components/profile/profile.component'
import {ManageInvestmentComponent} from './../admin/manage-investment/manage-investment.component';
import {ProfileSummaryComponent} from './../../shared/components/profile-summary/profile-summary.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './../../shared/components/chart/chart.component';
import { ChatComponent } from '../chat/chat.component';


@NgModule({
  declarations: [
    AddUserComponent,
    UserComponent, 
    UserProfileComponent,
    UserDashboardComponent,
    UserSettingsComponent,
    PoolsComponent,
    PoolDetailComponent,
    SideBarComponent,
    HeaderComponent,
    DashboardHeaderComponent,
    ReportComponent,
    ManageInvestmentComponent,
    ProfileComponent,
    ProfileSummaryComponent,
    ChartComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    Angular2PromiseButtonModule,
    ChartsModule
  ],
  exports:[
    UserSettingsComponent,
    ProfileComponent,
    PoolsComponent,
    PoolDetailComponent,
    SideBarComponent,
    HeaderComponent,
    DashboardHeaderComponent,
    ReportComponent,
    ManageInvestmentComponent,
    UserDashboardComponent,
    ProfileSummaryComponent,
    ChatComponent
  ]
})
export class UserModule { }
