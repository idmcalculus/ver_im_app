import { Component, Input, Output, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/user/user.service';
import { CloudinaryService } from '../../services/cloudinary.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  @Input() public editable: boolean;
  @ViewChild('pass') input;
  @ViewChild('confirmPass') input2;
  @ViewChild('error') error;

  isSubmitting;
  isLoading = true;
  countries: string[] = ['Nigeria', 'Ghana'];
  bankList: any = [];
  dateModel: Date;
  passText = '';
  confirmPassText = '';
  opt1selected = false;
  opt2selected = false;
  image;
  dayComponent = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  monthComponent = [{count: '1', title: 'Jan'}, {count: '2', title: 'Feb'},
  {count: '3', title: 'Mar'}, {count: '4', title: 'Apr'},
  {count: '5', title: 'May'}, {count: '6', title: 'Jun'},
  {count: '7', title: 'Jul'}, {count: '8', title: 'Aug'},
  {count: '9', title: 'Jan'}, {count: '10', title: 'Oct'},
  {count: '11', title: 'Nov'}, {count: '12', title: 'Dec'}];


  constructor(private userService: UserService,
              private cloudinaryService: CloudinaryService,
              private toastrService: ToastrService
    ) {
     this.getBankList();
    }


  ngOnInit() {
      this.isLoading = false;
  }

  updateProfile() {
      if (this.user.profile_picture && this.user.profile_picture !== '') {
        this.cloudinaryService.upload(this.user.profile_picture).subscribe(resp => {
          if (resp) {
            this.user.profile_picture = resp;
            this.isSubmitting = this.userService.updateProfile(this.user).subscribe(resp => {
              if (resp && resp.success) {
                alert(resp.success.Message);
              }
            });
          }
        });
      } else {
        this.isSubmitting = this.userService.updateProfile(this.user).subscribe(resp => {
          if (resp && resp.success) {
            alert(resp.success.Message);
          }
        });
      }



  }

  updateAccountPreference() {
    this.isSubmitting = this.userService.updatePreference(this.user).subscribe(resp => {
      if (resp && resp.success) {
        alert(resp.success.Message);
      }
    });
  }

  updateBankDetails() {
    this.isSubmitting = this.userService.updateBankDetails(this.user).subscribe(resp => {
      if (resp && resp.success) {
        alert(resp.success.Message);
      }
    });
  }


  validate() {
    this.input.nativeElement.style.borderColor = '#ccc';
    this.input2.nativeElement.style.borderColor = '#ccc';
    this.error.nativeElement.style.display = 'none';
  }

  changePassword(): void {
    if (this.passText === '') {
     this.input.nativeElement.style.borderColor = 'red';
     this.error.nativeElement.style.display = 'block';
    }
    if (this.confirmPassText === '') {
      this.input2.nativeElement.style.borderColor = 'red';
      this.error.nativeElement.style.display = 'block';
    }
    if (this.passText && this.confirmPassText !== '') {
      if (this.passText == this.confirmPassText) {
        this.isSubmitting = this.userService.changePassword(this.passText).subscribe(resp => {
          if (resp && resp.success) {
            this.toastrService.success('Password updated succesfully');
            this.passText = '';
            this.confirmPassText = '';
            localStorage.setItem('token', resp.success.Token);
          }
        });
      } else {
        // alert('Passwords do not match');
        this.toastrService.error('Passwords do not match');
      }
      this.error.nativeElement.style.display = 'none';
    }
  }

  getBankList() {
    this.userService.getBankList().subscribe(resp => {
      this.bankList = resp.success.Data;
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.user.profile_picture = this.image;
    };
    myReader.readAsDataURL(file);
  }

}
