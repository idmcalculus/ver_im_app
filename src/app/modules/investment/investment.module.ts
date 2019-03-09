import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentComponent } from './investment.component';
import { InvestmentRoutingModule } from './investment-router-module';

@NgModule({
  declarations: [InvestmentComponent],
  imports: [
    CommonModule,InvestmentRoutingModule
  ]
})
export class InvestmentModule { }
