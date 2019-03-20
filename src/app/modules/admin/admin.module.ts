import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminRoutingModule} from './admin-router.module';
import {UserModule} from './../user/user.module';
import {ModalComponent} from './../../shared/components/modal/modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserModule
    
  ],providers: [
  ],exports:[
  ]
})
export class AdminModule { }
