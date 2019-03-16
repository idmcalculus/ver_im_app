import { Component } from '@angular/core';
import {DatasharerService} from './core/datasharer/datasharer.service';
import { UserSession } from './shared/models/UserSession';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  showHeader:boolean=true;  
  showFooter:boolean=true;

  title = 'versaim-app';
  session: UserSession;
  constructor(private dataSharer:DatasharerService){
    this.dataSharer.userSession.subscribe(session => this.session = session)
    this.dataSharer.profileViewIsActive.subscribe(inProfileView =>{
      this.showHeader = !inProfileView
      this.showFooter = !inProfileView
    })
  }
}
