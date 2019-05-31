import { Component,Input,Output, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/user/user.service';
import { CloudinaryService } from '../../services/cloudinary.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  @Input() public user:User={email:'',password:'',country:'',first_name:'',last_name:'',bank_name:''};
  @Input() public editable:boolean;
  isSubmitting;
  isLoading:boolean=true;
  countries:string[]=['Nigeria','Ghana']
  bankList:any=[]
  dateModel:Date;
  opt1selected:boolean=false;
  opt2selected:boolean=false;
  image;
  dayComponent = ['1','2','3','4','5','6','7','8','9','10',
                  '11','12','13','14','15','16','17','18','19','20',
                  '21','22','23','24','25','26','27','28','29','30','31'];
  monthComponent = [{count:'1',title:'Jan'},{count:'2',title:'Feb'},
  {count:'3',title:'Mar'},{count:'4',title:'Apr'},
  {count:'5',title:'May'},{count:'6',title:'Jun'},
  {count:'7',title:'Jul'},{count:'8',title:'Aug'},
  {count:'9',title:'Jan'},{count:'10',title:'Oct'},
  {count:'11',title:'Nov'},{count:'12',title:'Dec'}]


  constructor(private userService:UserService,
    private cloudinaryService:CloudinaryService) { 
     this.getBankList();
    }

  ngOnInit(){
      this.isLoading = false;
  }

  updateProfile(){
      // console.log(JSON.stringify(this.user))
      if(this.user.profile_picture && this.user.profile_picture!=''){
        this.cloudinaryService.upload(this.user.profile_picture).subscribe(resp=>{
          if(resp){
            this.user.profile_picture = resp;
            this.isSubmitting = this.userService.updateProfile(this.user).subscribe(resp=>{
              if(resp && resp.success){
                alert(resp.success.Message)
              }
            });
          }
        })
      }else{
        this.isSubmitting = this.userService.updateProfile(this.user).subscribe(resp=>{
          if(resp && resp.success){
            alert(resp.success.Message)
          }
        });
      }
      

      
  }

  updateAccountPreference(){
    console.log(JSON.stringify(this.user))
    this.isSubmitting = this.userService.updatePreference(this.user).subscribe(resp=>{
      if(resp && resp.success){
        alert(resp.success.Message)
      }
    });
  }

  updateBankDetails(){
    this.isSubmitting = this.userService.updateBankDetails(this.user).subscribe(resp=>{
      if(resp && resp.success){
        alert(resp.success.Message)
      }
    });
  }

  getBankList(){
    this.userService.getBankList().subscribe(resp=>{
      this.bankList = resp.success.Data;
    })
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.user.profile_picture = this.image;
    }
    myReader.readAsDataURL(file);
  }

}
