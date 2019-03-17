import { Component, OnInit } from '@angular/core';
import {DatasharerService} from '../../core/datasharer/datasharer.service';
import { UserSession } from 'src/app/shared/models/UserSession';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  constructor(private dataSharer:DatasharerService) { 
    this.dataSharer.setInProfileView(true);
  }

  ngOnInit() {
  }

}
