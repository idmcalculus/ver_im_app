import { NgModule }            from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';
import {RouterGaurdService} from './../../core/router-gaurd/router-gaurd';
import {AdminComponent} from './admin.component';
import {ProfileComponent} from './../user/profile/profile.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {UserSettingsComponent} from './../user/settings/settings.component';
import {PoolsComponent} from './../user/pools/pools.component';
import {PoolDetailComponent} from './../user/pool-detail/pool-detail.component';



const userRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,canActivate:[RouterGaurdService],
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'investments', component: ProfileComponent },
          { path: 'settings', component: UserSettingsComponent },
          { path: 'manage-users', component: ManageUsersComponent },
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