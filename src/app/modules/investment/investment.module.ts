import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentComponent } from './investment.component';
import { InvestmentRoutingModule } from './investment-router-module';
import {InvestmentDetailComponent} from './investment-detail/investment-detail.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [InvestmentComponent,InvestmentDetailComponent],
  imports: [
    CommonModule,InvestmentRoutingModule,FormsModule
  ]
})
export class InvestmentModule { }
