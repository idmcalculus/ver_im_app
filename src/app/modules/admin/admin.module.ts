import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {ManageInvestmentComponent} from './manage-investment/manage-investment.component';
import {AdminRoutingModule} from './admin-router.module';
import {UserModule} from './../user/user.module';

import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageInvestmentComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserModule,
    FormsModule
    
  ],providers: [
  ],exports:[
    ManageInvestmentComponent
  ]
})
export class AdminModule { }
