import { Component, OnInit,Input } from '@angular/core';
import { Career } from 'src/app/shared/models/Career';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-career-application',
  templateUrl: './career-application.component.html',
  styleUrls: ['./career-application.component.css']
})
export class CareerApplicationComponent implements OnInit {
  careerId:string;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(resp=>{
      alert(resp.careerId)
      this.careerId = resp.careerId;
    })
  }

}
