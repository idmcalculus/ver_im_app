import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {User} from '../../models/user';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user:User={email:'',password:''};
  isSubmitting;
  loginText:string="Login";
  constructor(private signInService: SignInService,private routes:Router) { }

  ngOnInit() {

  }


  signIn(): void {
      this.isSubmitting = new Promise((resolve, reject) => {
        this.loginText = "Authenticating...";
        this.signInService.login(this.user)
        .subscribe(UserDetails => {
          console.log(UserDetails)
          if(UserDetails){
            this.user = UserDetails;
            alert(`Welcome ${UserDetails.success.data.first_name}`);
            window.location.href = "profile";
          }
          this.loginText = "Login";
          resolve();
        });
      });
    
  }
}
