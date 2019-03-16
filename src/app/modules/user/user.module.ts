import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';

@NgModule({
  declarations: [UserComponent, VerifyUserComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
