import { Component, OnInit } from '@angular/core';
import {AppAuthService} from './../../core/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private authService: AppAuthService
    ) {
        this.authService.setInProfileView(false);
   }


}