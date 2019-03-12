import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user:User={email:'paul_adebiyi@yahoo.com',password:'password'};
  isSubmitting;
  loginText:string="Login";
  constructor(private signInService: SignInService) { }

  ngOnInit() {

  }

  signIn(): void {
    this.isSubmitting = new Promise((resolve, reject) => {
      this.loginText = "Authenticating..."
      this.signInService.login(this.user)
      .subscribe(UserDetails => {
        if(UserDetails){
          this.user = UserDetails;
          this.loginText = "Login";
          resolve(this.user)
        }else{
          this.loginText = "Login";
          reject()
        }
    });
    });
  }
}
