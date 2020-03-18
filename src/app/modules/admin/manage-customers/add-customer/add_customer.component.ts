import { Component, Input,  OnInit, ViewChild, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { SignUpService } from 'src/app/shared/components/sign-up/sign-up.service';
import { UserService } from 'src/app/modules/user/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add_customer.component.html',
  styleUrls: ['./add_customer.component.css']
})
export class AddCustomerComponent implements OnInit {
    @Input() public editable: boolean;
    @ViewChild('pass') input;
    @ViewChild('confirmPass') input2;
    @ViewChild('error') error;

    user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
    isSubmitting;
    isLoading = true;
    countries: string[] = ['Nigeria', 'Ghana'];
    bankList: any = [];
    passText = '';
    confirmPassText = '';
    opt1selected = false;
    opt2selected = false;
    tabProps = {};

    constructor(private userService: UserService,
                private toastrService: ToastrService,
                private router: Router,
                private signUpService: SignUpService
      ) {
       this.getBankList();

      }


    ngOnInit() {
        this.isLoading = false;
         }


    cancelProfile() {
        this.isSubmitting = false;
        this.user = { email: '', password: '' };
        this.router.navigateByUrl('admin/manage-customers');
    }

    createProfile(): void {
        this.isSubmitting = new Promise((resolve, reject) => {
            this.user.authentication_type = 'E';
            this.user.user_category = 'User';
            this.user.average_monthly_income = '0';
            this.signUpService.create(this.user)
                .subscribe(UserDetails => {
                    if (UserDetails) {
                        this.toastrService.success('Registeration Succesfull');
                        this.user = { email: '', password: '' };
                        this.router.navigateByUrl('admin/manage-customers');
                    }
                    resolve();
                });
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
      if (this.passText === this.confirmPassText) {
        this.isSubmitting = this.userService.changePassword(this.passText).subscribe(resp => {
          if (resp && resp.success) {
            this.toastrService.success('Password updated succesfully');
            this.passText = '';
            this.confirmPassText = '';
            localStorage.setItem('token', resp.success.Token);
          }
        });
        console.log(this.passText);
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
    toggleTab(tabname: string) {
        switch (tabname) {
          default:
            this.tabProps = {profileShow : true};
            break;
          case 'bank':
            this.tabProps = {bankShow : true};
            break;
          case 'settings':
            this.tabProps = {settingsShow : true};
            break;
        }
      }
  }
