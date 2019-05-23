import { NgModule }            from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';
import { CareerComponent } from './career.component';
import { CareerApplicationComponent } from './career-application/career-application.component';

const investmentRoutes: Routes = [
  { path: 'career', component: CareerComponent },
  { path: 'career/apply/:careerId', component: CareerApplicationComponent }
//   { path: 'career',
//   children:[
//     {path:'',
//     children:[
//       {path:'list',component:CareerComponent},
//       // {path:'detail/:careerId',component:CareerDetailsComponent},
//       {path:'apply/:careerId',component:CareerApplicationComponent},
//       {path:'',component:CareerComponent}
//     ]}    
//   ] 
//   },
];

@NgModule({
  imports: [RouterModule.forChild(investmentRoutes)],
  exports: [RouterModule]
})
export class CareerRoutingModule {}