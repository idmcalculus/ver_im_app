import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
// import {ManageInvestmentComponent} from './manage-investment/manage-investment.component';
import {AdminRoutingModule} from './admin-router.module';
import {UserModule} from './../user/user.module';

import {FormsModule} from '@angular/forms';
import {ApplicantsComponent} from './manage-career/applicants/applicants.component';
import {CreateComponent} from './manage-career/create/create.component';
import {ListComponent} from './manage-career/list/list.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ApplicantsComponent,
    CreateComponent,
    ListComponent

    // ManageCareerRoutingModule
    // ManageInvestmentComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserModule,
    FormsModule
    
  ],providers: [
  ],exports:[
    // ManageInvestmentComponent
  ]
})
export class AdminModule { }
