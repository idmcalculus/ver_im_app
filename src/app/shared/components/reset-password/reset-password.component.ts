import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password:String;
  passwordConfirm:String;
  isSubmitting;
  resetText:String="Submit"

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private resetPassService:ResetPasswordService,
    private toastrService:ToastrService
    ) { }

  ngOnInit() {
    var token = this.activatedRoute.snapshot.params['token'];
    // alert("i have :: "+token)
    //confirm token is valid else show invalid token used and hide 

        // this.resetPassService.reset(token)
        // .subscribe(verifyRespons => {
        //   if(verifyRespons.success.Data){
        //     this.toastrService.success(`Reset was successful`)
        //     this.router.navigateByUrl("signin");
        //   }else{
        //     alert('Invalid Token')
        //     // this.router.navigateByUrl("signin");
        //   }
        // })
  }

  resetpassword(){
    if(!this.password || this.password != this.passwordConfirm){
        
        this.toastrService.error(`Password reset `)
        return false;
    }
    this.isSubmitting = new Promise((resolve, reject) => {
      this.resetText = "Submitting...";      
      this.resetPassService.reset(this.passwordConfirm)
      .subscribe(UserDetails => {
        if(UserDetails){
          this.toastrService.success(`${UserDetails.success.Message}`)
          this.router.navigateByUrl('/signin');
        }
        this.resetText = "Submit";
        resolve();
      });
    });
  }

}
