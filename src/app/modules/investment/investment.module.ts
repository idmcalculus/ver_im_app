import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentComponent } from './investment.component';
import { InvestmentRoutingModule } from './investment-router-module';
import {InvestmentDetailComponent} from './investment-detail/investment-detail.component';

@NgModule({
  declarations: [InvestmentComponent,InvestmentDetailComponent],
  imports: [
    CommonModule,InvestmentRoutingModule
  ]
})
export class InvestmentModule { }
