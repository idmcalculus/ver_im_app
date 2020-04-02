import { Component, Input, Output, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
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
    dateModel: Date;
    passText = '';
    confirmPassText = '';
    opt1selected = false;
    opt2selected = false;
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
                private toastrService: ToastrService,
                private router: Router,
      ) {
       this.getBankList();
      }


    ngOnInit() {
        this.isLoading = false;
    }

    cancelProfile() {
        this.isSubmitting = false;
        this.router.navigateByUrl('admin/manage-users');
    }
    
    updateAccountPreference() {
        console.log(JSON.stringify(this.user));
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

  }
