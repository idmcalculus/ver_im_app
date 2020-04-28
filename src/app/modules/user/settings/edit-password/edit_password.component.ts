import { Component, Input,  OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/user/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit_password',
  templateUrl: './edit_password.component.html',
  styleUrls: ['./edit_password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  @ViewChild('pass') input;
  @ViewChild('confirmPass') input2;
  @ViewChild('error') error;
  @ViewChild('closebutton') closebutton;

   modalText = 'Save Changes';
  _shown = true;
  isSubmitting;
  isLoading = true;
  passText = '';
  confirmPassText = '';
  opt1selected = false;
  opt2selected = false;

  constructor(private userService: UserService,
              private toastrService: ToastrService,
              private router: Router
   ) { }

ngOnInit() {
    this.isLoading = false;
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
            if (this.passText === this.confirmPassText) {
            this.modalText = 'Updating...';

            this.isSubmitting = this.userService.changePassword(this.passText).subscribe(resp => {
                if (resp && resp.success) {
                this.toastrService.success('Password updated succesfully');
                this.passText = '';
                this.confirmPassText = '';
                localStorage.setItem('token', resp.success.Token);
                this.modalText = 'Save Changes';
                this.closebutton.nativeElement.click();
                }
            });
            } else {
            // alert('Passwords do not match');
            this.toastrService.error('Passwords do not match');
            }
            this.error.nativeElement.style.display = 'none';
        }
    }

}
