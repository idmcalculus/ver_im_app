import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';
import { NgxPaginationModule } from 'ngx-pagination'
import { AdminComponent } from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
// import {ManageInvestmentComponent} from './manage-investment/manage-investment.component';
import {AdminRoutingModule} from './admin-router.module';
import {UserModule} from './../user/user.module';
import {CareerModule} from './../career/career.module';
import { ChartsModule } from 'ng2-charts';
import { ViewCustomerComponent } from './manage-users/view-customer/view_customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApplicantsComponent} from './manage-career/applicants/applicants.component';
import {CreateComponent} from './manage-career/create/create.component';
import {ListComponent} from './manage-career/list/list.component';
import { AddCustomerComponent } from './manage-users/add-customer/add_customer.component';
import {AddPoolComponent} from './../user/add-pool/add-pool.component';
import {PoolsComponent} from './../user/pools/pools.component';
import {PoolDetailComponent} from './../user/pool-detail/pool-detail.component';
import {AddUserComponent} from './manage-users/addUserToPool/addUser.component';
import {PoolreportComponent} from '../../shared/components/report/investment-report/investment-report.component';
import {ViewedreportComponent} from '../../shared/components/report/view-pool-report/view-pool-report.component';
import {PurchasedreportComponent} from '../../shared/components/report/purchased-pool-report/purchased-pool-report.component';
import {UserreportComponent} from '../../shared/components/report/customer-report/customer-report.component';
import {viewUserPoolComponent} from '../../shared/components/report/view-customer-report/view-customer-report.component';
import {ManageCategoryComponent} from './manage-category//manage-category.component';
import {ManageAdminComponent} from './manage-admin/manage-admin.component';
import {ProgressBarModule} from 'angular-progress-bar';
import { EditCustomerComponent } from './manage-users/edit-customer/edit_customer.component';
import { AddUserGroupComponent } from './user-group/add-user-group/add-user-group.component';
import { EditUserGroupComponent } from './user-group/edit-user-group/edit-user-group.component';
import { ViewUserGroupComponent } from './user-group/view-user-group/view-user-group.component';
import { ViewUsersComponent } from './user-group/view-users/view-users.component';
import { AddUsersComponent } from './user-group/add-users/add-users.component';
import { EditUsersComponent } from './user-group/edit-users/edit-users.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatFormFieldModule, MatSelectModule, MatInputModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import {exportUserPoolComponent} from '../../shared/components/report/view-customer-export/view-customer-export.component';
import { UseractivityComponent } from 'src/app/shared/components/report/user-activity-report/activity-report.component';
import { SearchCustomerComponent } from './manage-users/search-customer/search_customer.component';

// import {CareerDetailsComponent} from './../career/career-details/career-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ViewedreportComponent,
    PurchasedreportComponent,
    ApplicantsComponent,
    CreateComponent,
    ListComponent,
    exportUserPoolComponent,
    AddCustomerComponent,
    ViewCustomerComponent,
    EditCustomerComponent,
    PoolreportComponent,
    UserreportComponent,
    UseractivityComponent,
    viewUserPoolComponent,
    AddUserComponent,
    AddPoolComponent,
    ManageCategoryComponent,
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
    EditUsersComponent,
    PoolDetailComponent,
    PoolsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    UserModule,
    CareerModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    Angular2PromiseButtonModule.forRoot({
      spinnerTpl: '<span class="btn-spinner"></span>',
      disableBtn: true,
      btnLoadingClass: 'is-loading',
      handleCurrentBtnOnly: false,
    }),
    ChartsModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ], providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'}}
  ], exports: [
    // ManageInvestmentComponent
  ]
})
export class AdminModule { }
