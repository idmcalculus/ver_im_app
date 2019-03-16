import { Component, OnInit } from '@angular/core';
import {SignUpService} from './sign-up.service';
import {User} from '../../models/User';
let  userBackbone = {email:'',password:''}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user:User=userBackbone;
  passwordConfim:string='';
  isSubmitting;
  signUpText:string="Register";

  constructor(private signUpService:SignUpService) { }

  ngOnInit() {
  }



  signUp(): void {
    if(this.passwordConfim==this.user.password){
      this.isSubmitting = new Promise((resolve, reject) => {
        this.signUpText = "Submitting...";
        this.signUpService.register(this.user)
        .subscribe(UserDetails => {
          if(UserDetails){
            alert("Registeration Succesfull, check mail to verify");
            this.user = {email:'',password:''};
          }
          this.passwordConfim = "";
          this.signUpText = "Register";
          resolve();
        });
      });
    }else{
      alert('Passwords do not match');
    }
    
  }

}
