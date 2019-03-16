import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from './profile-router-module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,ProfileRoutingModule
  ]
})
export class ProfileModule { }
