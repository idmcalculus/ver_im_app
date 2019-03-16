import { NgModule }            from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';
import { UserComponent }    from './user.component';
import {ProfileComponent} from './profile/profile.component';

const homeRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}