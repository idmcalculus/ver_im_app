import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';
import { AdminComponent } from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
// import {ManageInvestmentComponent} from './manage-investment/manage-investment.component';
import {AdminRoutingModule} from './admin-router.module';
import {UserModule} from './../user/user.module';
import {CareerModule} from './../career/career.module';

import {FormsModule} from '@angular/forms';
import {ApplicantsComponent} from './manage-career/applicants/applicants.component';
import {CreateComponent} from './manage-career/create/create.component';
import {ListComponent} from './manage-career/list/list.component';
import {ManageCategoryComponent} from './manage-category//manage-category.component';

// import {CareerDetailsComponent} from './../career/career-details/career-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ApplicantsComponent,
    CreateComponent,
    ListComponent,
    ManageCategoryComponent,

    // ManageCareerRoutingModule
    // ManageInvestmentComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserModule,
    CareerModule,
    FormsModule,
    Angular2PromiseButtonModule.forRoot({
      spinnerTpl: '<span class="btn-spinner"></span>',
      disableBtn: true,
      btnLoadingClass: 'is-loading',
      handleCurrentBtnOnly: false,
    })
    
  ],providers: [
  ],exports:[
    // ManageInvestmentComponent
  ]
})
export class AdminModule { }
