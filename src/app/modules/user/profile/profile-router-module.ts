import { NgModule }            from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';
import { ProfileComponent }    from './profile.component';
import {RouterGaurdService} from '../../../core/router-gaurd/router-gaurd';

const profileRoutes: Routes = [
  { path: 'profile', component: ProfileComponent,canActivate:[RouterGaurdService] }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}