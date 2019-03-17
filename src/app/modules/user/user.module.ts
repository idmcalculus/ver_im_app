import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import {ProfileComponent} from './profile/profile.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';

import {UserRoutingModule} from './user-routing.module';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

@NgModule({
  declarations: [
    UserComponent, 
    VerifyUserComponent,
    ProfileComponent,
    UserDashboardComponent,
    UserHeaderComponent,
    UserSideBarComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports:[
    UserHeaderComponent,
    UserSideBarComponent,
    UserSettingsComponent
  ]
})
export class UserModule { }
