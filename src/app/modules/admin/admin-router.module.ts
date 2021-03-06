import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouterGaurdService} from './../../core/router-gaurd/router-gaurd';
import {AdminComponent} from './admin.component';
import {UserProfileComponent} from './../user/user-profile/user-profile.component';
import {ManageAdminComponent} from './manage-admin/manage-admin.component';
// import {ManageCareerComponent} from './manage-career/manage-career.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {UserSettingsComponent} from './../user/settings/settings.component';
import {PoolsComponent} from './../user/pools/pools.component';
import {UserPoolDetailComponent} from './../user/userpool-detail/userpool-detail.component';
import {UserPoolsComponent} from './../user/user-pool/user-pool.component';
import {AddPoolComponent} from './../user/add-pool/add-pool.component';
import {PoolDetailComponent} from './../user/pool-detail/pool-detail.component';
import {AddUserComponent} from './manage-users/addUserToPool/addUser.component';
import {PoolreportComponent} from '../../shared/components/report/investment-report/investment-report.component';
import {ViewedreportComponent} from '../../shared/components/report/view-pool-report/view-pool-report.component';
import {PurchasedreportComponent} from '../../shared/components/report/purchased-pool-report/purchased-pool-report.component';
import {UserreportComponent} from '../../shared/components/report/customer-report/customer-report.component';
import {exportUserPoolComponent} from '../../shared/components/report/view-customer-export/view-customer-export.component';
import {ViewUserPoolComponent} from '../../shared/components/report/view-customer-report/view-customer-report.component';

import {CreateComponent} from './manage-career/create/create.component';
import {ListComponent} from './manage-career/list/list.component';
import {ApplicantsComponent} from './manage-career/applicants/applicants.component';
import {ManageCategoryComponent} from './manage-category/manage-category.component';
import { ChatComponent } from '../chat/chat.component';
import {SearchCustomerComponent} from './manage-users/search-customer/search_customer.component';
import { AddCustomerComponent } from './manage-users/add-customer/add_customer.component';
import { ViewCustomerComponent } from './manage-users/view-customer/view_customer.component';
import { EditCustomerComponent } from './manage-users/edit-customer/edit_customer.component';
import { InvestmentGroupComponent } from '../investment/investment-group/investment-group.component';
import { InvestmentProfileComponent } from '../user/investment-profile/investment-profile.component';
import { UseractivityComponent } from 'src/app/shared/components/report/user-activity-report/activity-report.component';
import { ViewUserGroupComponent } from './user-group/view-user-group/view-user-group.component';
import { AddUserGroupComponent } from './user-group/add-user-group/add-user-group.component';
import { EditUserGroupComponent } from './user-group/edit-user-group/edit-user-group.component';
import { ViewUsersComponent } from './user-group/view-users/view-users.component';
import { AddUsersComponent } from './user-group/add-users/add-users.component';
import { EditUsersComponent } from './user-group/edit-users/edit-users.component';
import { AuthGuardService as AuthGuard } from '../../auth/auth-guard.service';



const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent, canActivate: [RouterGaurdService],
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: UserProfileComponent },
          { path: 'settings', component: UserSettingsComponent },

          { path: 'manage-users',
            children: [
              {path: '',  pathMatch: 'full', component: SearchCustomerComponent},
              {path: 'new', component: AddCustomerComponent},
              {path: ':email', component: ViewCustomerComponent },
              {path: ':email/edit', component: EditCustomerComponent },
              {path: 'search', component: SearchCustomerComponent },
          ] },
          { path: 'user-group',
            children: [
              {path: '',
              children: [
                {path: '', component: ViewUserGroupComponent},
                {path: 'add', component: AddUserGroupComponent},
                {path: 'edit', component: EditUserGroupComponent },
                {path: 'view-users', component: ViewUsersComponent },
                {path: 'add-users', component: AddUsersComponent },
                {path: 'view-users/:email', component: EditUsersComponent}
              ]}
          ]},
          { path: 'manage-investments',
              children: [
                //{path: '', component: PoolsComponent},
                //{path: 'investment', component: PoolsComponent},
                //{path: 'add-pools', component: AddPoolComponent},
                //{path: 'list-users', component: ManageUsersComponent },
          ] },
          { path: 'manage-admins', component: ManageAdminComponent },

          { path: 'manage-career',
            children: [
              {path: '',
                children: [
                  {path: 'create', component: CreateComponent},
                  {path: 'applicants', component: ApplicantsComponent},
                  {path: 'list', component: ListComponent},
                  {path: '', component: ListComponent}
                ]
              }
          ] },
          { path: 'manage-category', component: ManageCategoryComponent},
          { path: 'investment-group', component: InvestmentGroupComponent},
          { path: 'chat', component: ChatComponent},
          { path: 'addpools', component: AddPoolComponent },
          { path: 'poolReport', component: PoolreportComponent },
          {  path: 'activityReport', component: UseractivityComponent },
          { path: 'purchasedReport', component: PurchasedreportComponent },
          { path: 'viewedReport', component: ViewedreportComponent },
          { path: 'userReport', component: UserreportComponent },
          { path: 'userReport/:email', component: ViewUserPoolComponent },
          { path: 'userReport/:email/export/:id', component: exportUserPoolComponent },
          { path: 'pools', component: PoolsComponent },
          { path: 'pools/:id', component: PoolDetailComponent },
          { path: 'userPools', component: UserPoolsComponent },
          { path: 'userPools/:id', component: UserPoolDetailComponent },
          { path: 'pools/:id/investment-profile', component: InvestmentProfileComponent },
          { path: 'pools/:id/adduser', component: AddUserComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
