import { NgModule }            from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';
import {RouterGaurdService} from './../../core/router-gaurd/router-gaurd';
import {AdminComponent} from './admin.component';
import {ProfileComponent} from './../user/profile/profile.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';



const userRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'investments', component: ProfileComponent },
          { path: 'settings', component: RouterGaurdService },
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