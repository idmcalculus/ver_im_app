import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { InvestmentComponent } from './investment.component';
import { InvestmentDetailComponent } from './investment-detail/investment-detail.component';

const investmentRoutes: Routes = [
  { path: 'investments', component: InvestmentComponent },
  { path: 'investments/:category/list', component: InvestmentComponent },
  { path: 'investments/:id', component: InvestmentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(investmentRoutes)],
  exports: [RouterModule]
})
export class InvestmentRoutingModule { }