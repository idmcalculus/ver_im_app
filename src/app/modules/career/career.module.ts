import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';
import {FormsModule} from '@angular/forms';
import {CareerApplicationComponent} from './career-application/career-application.component'
import {CareerDetailsComponent} from './career-details/career-details.component';
import {CareerComponent} from './career.component';
import { CareerRoutingModule } from './career-router.module';

@NgModule({
  declarations: [
    CareerApplicationComponent,
    CareerDetailsComponent,
    CareerComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    CareerRoutingModule,
    Angular2PromiseButtonModule.forRoot({
        spinnerTpl: '<span class="btn-spinner"></span>',
        disableBtn: true,
        btnLoadingClass: 'is-loading',
        handleCurrentBtnOnly: false,
      })
  ],
  exports:[
    CareerDetailsComponent
  ]
})
export class CareerModule { }
