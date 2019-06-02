import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html'
})
export class VerifyUserComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute:ActivatedRoute) { 

    }

  ngOnInit() {
        var queryString = this.activatedRoute.snapshot.params['data'];
        alert("querystring is: "+queryString)
        //verify user
  }


}
