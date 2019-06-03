import { Component, OnInit } from '@angular/core';
import {DatasharerService} from '../../../core/datasharer/datasharer.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  constructor(private dataSharer:DatasharerService) { 
    
    this.dataSharer.setInProfileView(true);
  }


}
