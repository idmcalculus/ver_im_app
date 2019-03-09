import { NgModule }            from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';
import { InvestmentComponent }    from './investment.component';

const investmentRoutes: Routes = [
  { path: 'investment', component: InvestmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(investmentRoutes)],
  exports: [RouterModule]
})
export class InvestmentRoutingModule {}