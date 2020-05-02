import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { SignUpService } from 'src/app/shared/components/sign-up/sign-up.service';
import { UserService } from 'src/app/modules/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add_customer.component.html',
  styleUrls: ['./add_customer.component.css']
})
export class AddCustomerComponent implements OnInit {
    @ViewChild('closebutton') closebutton;

    modalText = 'Save Changes';
    user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
    isSubmitting;
    isLoading = true;
    countries: string[] = ['Abia','FCT Abuja','Adamawa','Akwa Ibom','Ananmbra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo',
                           'Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
                           'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe', 'Zamfara'];
    bankList: any = [];


    constructor(private userService: UserService,
                private toastrService: ToastrService,
                private router: Router,
                private signUpService: SignUpService,
                private location: Location

      ) {
       this.getBankList();

      }


    ngOnInit() {
        this.isLoading = false;
         }

// Make additional tab buttons


TabControl(){
        let i;
        const items = document.querySelectorAll('.nav-link');
        const pane = document.querySelectorAll('.tab-pane');
        for(i = 0; i < items.length; i++){
            if((items[i]).classList.contains('active') ==true){
                break;
            }
        }
        if(i < items.length - 1){
            // for tab
            (items[i]).classList.remove('active');
            (items[i+1]).classList.add('active');
            // for pane
            (pane[i]).classList.remove('show', 'active');
            (pane[i+1]).classList.add('show', 'active');
        }
    }



cancelProfile() {
        this.isSubmitting = false;
        this.user = { email: '', password: '' };
        this.router.navigateByUrl('admin/manage-users');
    }

createProfile(): void {
        this.modalText = 'Creating...';
            this.user.authentication_type = 'E';
            this.user.user_category = 'User';
            this.user.average_monthly_income = '0';
            this.signUpService.create(this.user)
                .subscribe(UserDetails => {
                    if (UserDetails.success) {
                        this.toastrService.success('Registeration Succesfull');
                        this.modalText = 'Save Changes';
                        this.closebutton.nativeElement.click();
                        this.user = { email: '', password: '' };
                        this.router.navigateByUrl('admin/manage-users');
                    } else {
                        this.toastrService.error('Registeration Failed');
                        this.modalText = 'Save Changes';
                        this.closebutton.nativeElement.click();
                        this.user = { email: '', password: '' };
                    }
        });

    }

    getBankList() {
      this.userService.getBankList().subscribe(resp => {
        this.bankList = resp.success.Data;
      });
  }

  }
