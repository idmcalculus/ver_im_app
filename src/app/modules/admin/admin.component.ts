import { Component, OnInit } from '@angular/core';
// import {DatasharerService} from '../../core/datasharer/datasharer.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
 user:User={email:'',password:'',user_category:'User'};
  constructor(
    private authService:AuthService,
    private router:Router
    ) { 
      this.authService.setInProfileView(true);
  }

  ngOnInit() {
    this.authService.validateSession().then(resp=>{
      if(resp.email){
        this.user = resp;
        if(this.user.user_category=='User'){
          // this.router.navigate(['/user',{}]);
          window.location.href='/user'
        }
        
      //  this.authService.setUser(resp)
      }
    })
  }

}
