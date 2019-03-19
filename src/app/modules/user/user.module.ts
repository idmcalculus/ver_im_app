import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import {ProfileComponent} from './profile/profile.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';

import {UserRoutingModule} from './user-routing.module';
import { UserSettingsComponent } from './settings/settings.component';
import {FormsModule} from '@angular/forms';
import { PoolsComponent } from './pools/pools.component';
import { PoolDetailComponent } from './pool-detail/pool-detail.component';
import {SideBarComponent} from './../../shared/components/side-bar/side-bar.component';
import {HeaderComponent} from './../../shared/components/header/header.component';
import {HeaderDashboardComponent} from './../../shared/components/header-dashboard/header-dashboard.component';

@NgModule({
  declarations: [
    UserComponent, 
    VerifyUserComponent,
    ProfileComponent,
    UserDashboardComponent,
    UserSettingsComponent,
    PoolsComponent,
    PoolDetailComponent,
    SideBarComponent,
    HeaderComponent,
    HeaderDashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    Angular2PromiseButtonModule
  ],
  exports:[
    UserSettingsComponent,
    ProfileComponent,
    PoolsComponent,
    PoolDetailComponent,
    SideBarComponent,
    HeaderComponent,
    HeaderDashboardComponent
  ]
})
export class UserModule { }
