import { Component, OnInit } from '@angular/core';
import {DatasharerService} from '../../core/datasharer/datasharer.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private dataSharer: DatasharerService) {
    this.dataSharer.setInProfileView(false);
   }


}