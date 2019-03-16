import { Component, OnInit } from '@angular/core';
// import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-investment-detail',
  templateUrl: './investment-detail.component.html'
})
export class InvestmentDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // var investmentId = this.activatedRoute.snapshot.params['id'];
    // alert(`investment id is: ${investmentId}`)
        // this.verifyUserService.verify(token)
        // .subscribe(verifyRespons => {
        //   console.log("issh is: "+JSON.stringify(verifyRespons))
        //   if(verifyRespons.success.Data){
        //     alert(`Welcome ${verifyRespons.success.Data.first_name}`);
        //     window.location.href = "profile";
        //   }else{
        //     alert('Invalid Token')
        //     window.location.href = "home";
        //   }
        // })
  }

}
