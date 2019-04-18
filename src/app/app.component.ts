import { Component } from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import {Subscription} from 'rxjs';
import { User } from './shared/models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'versaim-app';
  showHeader:boolean=true;  
  showFooter:boolean=true;
  activeUser:User={user_category:'none',email:''};

  inProfileSubcription: Subscription;
  hasSession: Subscription;
  constructor(
    private authService:AuthService
    ){
      this.inProfileSubcription = this.authService.profileViewIsActive.subscribe(isLogedIn =>{
          this.showHeader = !isLogedIn;
          this.showFooter = !isLogedIn;
      })
  }

  ngOnInit(){
    this.authService.validateSession().then(resp=>{
      if(resp && resp.email){
        this.activeUser = resp;
        this.authService.setUser(this.activeUser);
      }
    })
  }

  ngOnDestroy() {
    this.inProfileSubcription.unsubscribe();
    this.hasSession.unsubscribe();
  }

  // loadDynamicScripts(){

  // }
}
