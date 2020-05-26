import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {VerifyUserService} from './verify-user.service';
@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html'
})
export class VerifyUserComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,private verifyUserService:VerifyUserService) { }

  ngOnInit() {
        var token = this.activatedRoute.snapshot.params['token'];
        this.verifyUserService.verify(token)
        .subscribe(verifyRespons => {
          if(verifyRespons.success.Data){
            alert(`Welcome ${verifyRespons.success.Data.first_name}`);
            this.router.navigateByUrl("signin");
          }else{
            alert('Invalid Token')
            this.router.navigateByUrl("signin");
          }
        })
    }
}
