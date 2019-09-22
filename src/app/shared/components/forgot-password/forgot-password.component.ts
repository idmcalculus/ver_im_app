import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from './forgot-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  isSubmitting;
  recoverText="Submit";
  email:String="";
  constructor(
    private forgotPasswordService:ForgotPasswordService,
    private toastrService:ToastrService) { }
    private _shown = false;

  ngOnInit() {
  }


  recover(): void {
    this.isSubmitting = new Promise((resolve, reject) => {
      this.recoverText = "Submitting...";
      var originUrl = window.location.pathname;
      
      this.forgotPasswordService.recoverPassword(this.email)
      .subscribe(UserDetails => {
        if(UserDetails){
          this.toastrService.success(`Recover link sent to email`)
        }
        this.recoverText = "Submit";
        resolve();
      });
    });
}

}
