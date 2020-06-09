import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CountoModule, CountoDirective }  from 'angular2-counto';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,HomeRoutingModule,
    CountoModule
  ],
  providers: [
    CountoDirective,
 ],
})
export class HomeModule { }
