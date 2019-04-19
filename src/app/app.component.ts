import { Component } from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import {Subscription} from 'rxjs';
import { User } from './shared/models/user';
import { DynamicScriptLoaderService } from './shared/services/dynamic-script-loader.service';


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
    private authService:AuthService,
    private dynamicScriptLoader:DynamicScriptLoaderService
    ){
      this.inProfileSubcription = this.authService.profileViewIsActive.subscribe(inDashboardView =>{
          this.showHeader = !inDashboardView;
          this.showFooter = !inDashboardView;
          this.installScripts(inDashboardView)
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

  installScripts(inDashBoard){
    if(inDashBoard){
      // alert('loaded them')
      this.dynamicScriptLoader.load('chartjs','p-coded','v-layout',
     'slimscroll','dash','platform','data-table','flat-pickr','g-maps','');
    }
    
  }
}
