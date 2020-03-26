import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentComponent } from './investment.component';
import { InvestmentRoutingModule } from './investment-router-module';
import { InvestmentDetailComponent } from './investment-detail/investment-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular4PaystackModule } from 'angular4-paystack';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InvestmentGroupComponent } from './investment-group/investment-group.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

// import { AngularRaveModule } from 'angular-rave';

@NgModule({
  declarations: [InvestmentComponent, InvestmentDetailComponent, InvestmentGroupComponent],
  imports: [
    CommonModule,
    InvestmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    Angular4PaystackModule,
    NgxSkeletonLoaderModule
    // AngularRaveModule
  ]
})
export class InvestmentModule { }
