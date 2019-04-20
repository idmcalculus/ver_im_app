import { Component, OnInit ,NgZone} from '@angular/core';
import {SignUpService} from './sign-up.service';
import {User} from './../../models/user';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
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

  constructor(private signUpService:SignUpService,
    private authService:AuthService,
    private router:Router,
    private dynamicScriptLoader:DynamicScriptLoaderService,
    ngZone:NgZone) {
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
   }

  ngOnInit() {
    this.installScript();
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

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var socialUser = {
      last_name:profile.getName().split(' ')[1],
      email:profile.getEmail(),
      first_name:profile.getName().split(' ')[0],
      user_category:'User',
      authentication_type:'G',
      // password:googleUser.getAuthResponse().id_token
    };
    console.log('signing up with :: '+JSON.stringify(socialUser))

    this.signUpService.register(socialUser)
        .subscribe(UserDetails => {
          if(UserDetails){
            // alert("Registeration Succesfull, check mail to verify");
            this.user = {email:'',password:''};
            this.authService.login(this.user)
            .subscribe(UserDetails => {
              if(UserDetails){
                this.user = UserDetails;
                alert(`Welcome ${this.user.first_name}`);
                // this.router.navigateByUrl(UserDetails.user_category.toLowerCase());
                window.location.href=`${UserDetails.user_category.toLowerCase()}`
              }
              this.signUpText = "sgining in...";
            });
          }
          this.passwordConfim = "";
        });
  }

  installScript(){
    this.dynamicScriptLoader.load('platform')
  }

}
