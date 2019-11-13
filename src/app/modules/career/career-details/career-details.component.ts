import { switchMap } from 'rxjs/operators';
import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { Career } from 'src/app/shared/models/Career';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { CareerService } from '../career.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/models/user';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.scss']
})
export class CareerDetailsComponent implements OnInit {

  _shown = true;
  editText = 'Edit'
  @Input() public career:Career;
  @Input() public isUser:boolean=true;
  userinfo: User = { user_category: 'none', email: '' };
  currentUserSubscription: Subscription;
  isAdmin:boolean=false;
  
  @Output() submit = new EventEmitter<Career>();

  constructor(private careerAppService:CareerService,
    private toastrService: ToastrService,
    private authService: AppAuthService
    ) { 
      this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
        // console.log("change occured "+JSON.stringify(user))
        this.userinfo = user;
        if(this.userinfo.user_category === 'Admin'){
          this.isAdmin = true
        }
      });
  }

  ngOnInit() {
    // console.log("icoming is :: "+JSON.stringify(this.career))
   
    if(typeof(this.career.career_responsibilities)=='string'){
      this.career.career_responsibilities = JSON.parse(this.career.career_responsibilities)
      this.career.career_requirements = JSON.parse(this.career.career_requirements)

    }
  }

  backtoList(){
    this.submit.emit(null)
  }

  edit(){
    if(this.editText === 'Edit'){
      this._shown = false;
      this.editText = 'Save';  
    }else{
      this.updateCareer();
    }
  }

  deleteCareer(){
    if (confirm("Are you sure you want to delete this?")) {
      this.careerAppService.deleteCareer(`${this.career.id}`).subscribe(resp=>{
        if(resp && resp.success){
          this.careerAppService.getCareers().subscribe(res=>{
            if(res && res.success){
              let careerList = res.success.Data
              this.toastrService.success(resp.success.Message);
              this.submit.emit(careerList);
            }
          })
        }
      })
    } else {
      //nothing happens
    }
  }

  updateCareer(){
    this.editText = 'Saving';
    this.careerAppService.updateCareer(this.career).subscribe(resp=>{
      if(resp && resp.success){
        this.careerAppService.getCareers().subscribe(res=>{
          if(res && res.success){
            this.toastrService.success(resp.success.Message);
            this._shown = true;
            this.editText = 'Edit';
          }
        })
      }
      this.editText = 'Save';
    })
  }

  

}
