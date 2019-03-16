import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import {ProfileComponent} from './profile/profile.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';

import {UserRoutingModule} from './user-routing.module';

@NgModule({
  declarations: [
    UserComponent, 
    VerifyUserComponent,
    ProfileComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
