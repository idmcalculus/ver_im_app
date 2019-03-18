import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../core/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private authService: AuthService
    ) {
        this.authService.setInProfileView(false);
   }


}