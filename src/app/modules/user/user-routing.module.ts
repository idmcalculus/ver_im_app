import { NgModule }            from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';
import { UserComponent }    from './user.component';
import {ProfileComponent} from './profile/profile.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {UserSettingsComponent} from './settings/settings.component';
import {RouterGaurdService} from './../../core/router-gaurd/router-gaurd';
import {PoolsComponent} from  './pools/pools.component';
import {PoolDetailComponent} from './pool-detail/pool-detail.component';



const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,canActivate:[RouterGaurdService],
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'investments', component: ProfileComponent },
          { path: 'settings', component: UserSettingsComponent },
          { path: 'pools', component: PoolsComponent },
          { path: 'pools/:id', component: PoolDetailComponent },
          { path: '', component: UserDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}