import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
// import {ManageInvestmentComponent} from './manage-investment/manage-investment.component';
import {AdminRoutingModule} from './admin-router.module';
import {UserModule} from './../user/user.module';
import {CareerModule} from './../career/career.module';
import { ChartsModule } from 'ng2-charts';
import { ViewCustomerComponent } from './manage-users/view-customer/view_customer.component';

import { FormsModule } from '@angular/forms';
import { ApplicantsComponent } from './manage-career/applicants/applicants.component';
import { CreateComponent } from './manage-career/create/create.component';
import { ListComponent } from './manage-career/list/list.component';
import { AddPoolComponent } from './../user/add-pool/add-pool.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
// import { ManageUsersComponent } from './manage-users/list-users/list_users.component';
import { SearchCustomerComponent } from './manage-users/search-customer/search_customer.component';
import { AddCustomerComponent } from './manage-users/add-customer/add_customer.component';
import { EditCustomerComponent } from './manage-users/edit-customer/edit_customer.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { AddUserGroupComponent } from './user-group/add-user-group/add-user-group.component';
import { EditUserGroupComponent } from './user-group/edit-user-group/edit-user-group.component';
import { ViewUserGroupComponent } from './user-group/view-user-group/view-user-group.component';
import { ViewUsersComponent } from './user-group/view-users/view-users.component';
import { AddUsersComponent } from './user-group/add-users/add-users.component';
import { EditUsersComponent } from './user-group/edit-users/edit-users.component';
// import {CareerDetailsComponent} from './../career/career-details/career-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ApplicantsComponent,
    CreateComponent,
    ListComponent,
    AddCustomerComponent,
    AddPoolComponent,
    ManageCategoryComponent,
    // ManageUsersComponent,
    ManageAdminComponent,
    ViewCustomerComponent,
    EditCustomerComponent,
    SearchCustomerComponent,
    ManageAdminComponent,
    AddUserGroupComponent,
    EditUserGroupComponent,
    ViewUserGroupComponent,
    ViewUsersComponent,
    AddUsersComponent,
    EditUsersComponent
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
    NgxPaginationModule,

  ], providers: [
  ], exports: [
    // ManageInvestmentComponent
  ]
})
export class AdminModule { }
