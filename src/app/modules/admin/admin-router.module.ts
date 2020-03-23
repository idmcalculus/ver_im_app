import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouterGaurdService} from './../../core/router-gaurd/router-gaurd';
import {AdminComponent} from './admin.component';
import {UserProfileComponent} from './../user/user-profile/user-profile.component';
import {ManageUsersComponent} from './/manage-users/list-users/list_users.component';
import {ManageAdminComponent} from './manage-admin/manage-admin.component';
// import {ManageCareerComponent} from './manage-career/manage-career.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {UserSettingsComponent} from './../user/settings/settings.component';
import {PoolsComponent} from './../user/pools/pools.component';
import {AddUserComponent} from '../../shared/components/addUserToPool/addUser.component';
import {AddPoolComponent} from './../user/add-pool/add-pool.component';
import {PoolDetailComponent} from './../user/pool-detail/pool-detail.component';

import {CreateComponent} from './manage-career/create/create.component';
import {ListComponent} from './manage-career/list/list.component';
import {ApplicantsComponent} from './manage-career/applicants/applicants.component';
import {ManageCategoryComponent} from './manage-category/manage-category.component';
import { ChatComponent } from '../chat/chat.component';
import { AddCustomerComponent } from './manage-customer/add-customer/add_customer.component';
import { EditCustomerComponent } from './manage-customer/edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './manage-customer/view-customer/view_customer.component';
import { InvestmentGroupComponent } from '../investment/investment-group/investment-group.component';




const userRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent, canActivate: [RouterGaurdService],
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: UserProfileComponent },
          { path: 'settings', component: UserSettingsComponent },

          { path: 'manage-customer',
            children: [
            {path: '',
            children: [
              {path: '', component: ViewCustomerComponent},
              {path: 'new', component: AddCustomerComponent},
              {path: 'view', component: ViewCustomerComponent },
              {path: 'edit', component: EditCustomerComponent },
            ]
            }
          ] },
          { path: 'manage-customer',
            children: [
            {path: '',
              children: [
                {path: '', component: ManageUsersComponent},
                {path: 'add-customer', component: AddCustomerComponent},
                {path: 'list-users', component: ManageUsersComponent },
              ]
            }
          ] },
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
          { path: 'pools', component: PoolsComponent },
          { path: 'pools/:id', component: PoolDetailComponent },
          { path: 'pools/:id/adduser', component: AddUserComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
