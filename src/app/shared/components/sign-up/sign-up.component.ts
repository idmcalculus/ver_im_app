import { Component, OnInit } from '@angular/core';
import {SignUpService} from './sign-up.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user:User={email:'',password:''};
  passwordConfim:string='';
  constructor(private signUpService:SignUpService) { }

  ngOnInit() {
  }


  signUp(): void {
    if(this.passwordConfim==this.user.password){
      this.signUpService.register(this.user)
      .subscribe(UserDetails => {
        if(UserDetails){
          this.user = UserDetails;
          console.log(JSON.stringify("i got: "+JSON.stringify(this.user)));
        }
      });
    }else{
      alert('Passwords do not match');
    }
    
  }

}
