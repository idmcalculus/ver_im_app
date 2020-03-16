import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';
import { AdminComponent } from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
// import {ManageInvestmentComponent} from './manage-investment/manage-investment.component';
import {AdminRoutingModule} from './admin-router.module';
import {UserModule} from './../user/user.module';
import {CareerModule} from './../career/career.module';
import { ChartsModule } from 'ng2-charts';

import {FormsModule} from '@angular/forms';
import {ApplicantsComponent} from './manage-career/applicants/applicants.component';
import {CreateComponent} from './manage-career/create/create.component';
import {ListComponent} from './manage-career/list/list.component';
import {SearchCustomerComponent} from './manage-customers/search-customer/search_customer.component';
import { AddCustomerComponent } from './manage-customers/add-customer/add_customer.component';
import { ViewCustomerComponent } from './manage-customers/view-customer/view_customer.component';
import { EditCustomerComponent } from './manage-customers/edit-customer/edit_customer.component';
import {ManageCategoryComponent} from './manage-category//manage-category.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {ManageAdminComponent} from './manage-admin/manage-admin.component';
import {ProgressBarModule} from 'angular-progress-bar';

// import {CareerDetailsComponent} from './../career/career-details/career-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ApplicantsComponent,
    CreateComponent,
    ListComponent,
    EditCustomerComponent,
    ViewCustomerComponent,
    AddCustomerComponent,
    SearchCustomerComponent,
    ManageUsersComponent,
    ManageCategoryComponent,
    ManageAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserModule,
    CareerModule,
    FormsModule,
    ProgressBarModule,
    Angular2PromiseButtonModule.forRoot({
      spinnerTpl: '<span class="btn-spinner"></span>',
      disableBtn: true,
      btnLoadingClass: 'is-loading',
      handleCurrentBtnOnly: false,
    }),
    ChartsModule,

  ], providers: [
  ], exports: [
    // ManageInvestmentComponent
  ]
})
export class AdminModule { }
