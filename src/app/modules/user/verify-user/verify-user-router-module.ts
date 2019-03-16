import { NgModule }            from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';
import { VerifyUserComponent }    from './verify-user.component';
import {RouterGaurdService} from '../../../core/router-gaurd/router-gaurd';

const profileRoutes: Routes = [
  { path: 'verify-user', component: VerifyUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class VerifyUserRoutingModule {}