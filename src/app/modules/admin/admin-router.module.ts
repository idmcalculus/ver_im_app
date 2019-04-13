import { NgModule }            from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';
import {RouterGaurdService} from './../../core/router-gaurd/router-gaurd';
import {AdminComponent} from './admin.component';
import {UserProfileComponent} from './../user/user-profile/user-profile.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
// import {ManageCareerComponent} from './manage-career/manage-career.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {UserSettingsComponent} from './../user/settings/settings.component';
import {PoolsComponent} from './../user/pools/pools.component';
import {PoolDetailComponent} from './../user/pool-detail/pool-detail.component';

import {CreateComponent} from './manage-career/create/create.component';
import {ListComponent} from './manage-career/list/list.component';
import {ApplicantsComponent} from './manage-career/applicants/applicants.component'
import {ManageCategoryComponent} from './manage-category/manage-category.component';



const userRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,canActivate:[RouterGaurdService],
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: UserProfileComponent },
          { path: 'investments', component: PoolsComponent },
          { path: 'settings', component: UserSettingsComponent },
          { path: 'manage-users', component: ManageUsersComponent },
          { path: 'manage-career', 
            children: [
            {path:'',
            children: [
              {path:'create',component:CreateComponent},
              {path:'applicants',component:ApplicantsComponent},
              {path:'list',component:ListComponent},
              {path:'',component:ListComponent}
            ]
            }
          ] },
          { path: 'manage-category', component:ManageCategoryComponent},
          { path: 'pools', component: PoolsComponent },
          { path: 'pools/:id', component: PoolDetailComponent },
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