import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {UserSettingsComponent} from './settings/settings.component';
import {RouterGaurdService} from './../../core/router-gaurd/router-gaurd';
import { userPoolsComponent } from './user-pool/user-pool.component';
import {PoolDetailComponent} from './pool-detail/pool-detail.component';
import { ChatComponent } from '../chat/chat.component';



const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,canActivate:[RouterGaurdService],
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: UserProfileComponent },
          { path: 'investments', component: UserProfileComponent },
          { path: 'settings', component: UserSettingsComponent },
          { path: 'chat', component: ChatComponent },
          { path: 'userPools', component: userPoolsComponent },
          { path: 'pools/:pool_id', component: PoolDetailComponent },
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
