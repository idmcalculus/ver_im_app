import { Component } from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import { UserSession } from './shared/models/UserSession';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  showHeader:boolean=true;  
  showFooter:boolean=true;
  inProfileSubcription: Subscription;
  title = 'versaim-app';
  session: UserSession;
  constructor(
    private authService:AuthService
    ){
      this.inProfileSubcription = this.authService.profileViewIsActive.subscribe(isLogedIn =>{
          this.showHeader = !isLogedIn;
          this.showFooter = !isLogedIn;
        
      })
  }

  ngOnInit(){
    
  }

  ngOnDestroy() {
    this.inProfileSubcription.unsubscribe();
  }
}
