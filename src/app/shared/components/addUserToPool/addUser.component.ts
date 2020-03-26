import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Report } from '../../models/Report';
import { User } from 'src/app/shared/models/user';
<<<<<<< HEAD
<<<<<<< HEAD
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute,Router} from '@angular/router';
import { AdminService } from '../../../modules/admin/admin.service';
import {InvestmentService} from '../../../modules/investment/investment.service'
=======
import { Router} from '@angular/router';
import { AdminService } from '../../../modules/admin/admin.service';
>>>>>>> new work
=======
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute,Router} from '@angular/router';
import { AdminService } from '../../../modules/admin/admin.service';
import {InvestmentService} from '../../../modules/investment/investment.service'
>>>>>>> cleaning up
import { UserService } from '../../../modules/user/user.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import {addUserService} from './addUser.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pool-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})

export class AddUserComponent implements OnInit {
  pool:Investment;
  poolId:number=0;
  isPaymentreport:boolean=false;
  number_of_pools:number;
  isLoading:boolean=true;
  reference:string='';
  user_email:string='';
  amount_paid:number;

<<<<<<< HEAD
<<<<<<< HEAD
  users:User[]=[];
  user:User = {email: '',};
=======
  users:[User]
>>>>>>> new push
=======
  users:User[]=[];
  user:User = {email: '',};
>>>>>>> new work
  selectedUser:User;
  @Input() public modaltitle:string;
  @Input() public modalButtonTitle:string;
  @Input() public modalData:any;
  @Input() public modalId:any;
  @Output() submit = new EventEmitter<any>();

  constructor(
<<<<<<< HEAD
<<<<<<< HEAD
    private route:ActivatedRoute,
=======
>>>>>>> new work
=======
    private route:ActivatedRoute,
>>>>>>> cleaning up
    private router:Router,
    private addUserService:addUserService,
    private toastrService: ToastrService,
    private dynamicScrLoader:DynamicScriptLoaderService,
    private investmentService:InvestmentService,
    private adminService:AdminService,
    private userService:UserService,
<<<<<<< HEAD
<<<<<<< HEAD
    private location: Location,
=======
>>>>>>> new work
=======
    private location: Location,
>>>>>>> Created Add User to Pool
  ) {
    this.route.params.subscribe(resp=>{
      this.poolId = resp.pool_id;
      if(!this.poolId){
        this.poolId = Number(this.route.snapshot.paramMap.get('id'));
      }
      this.fetchPool(String(this.poolId));
    })
<<<<<<< HEAD
  }

  cancelPool() {
    this.location.back()
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    console.log(this.selectedUser);
    
=======
>>>>>>> cleaning up
  }

  cancelPool() {
    this.location.back()
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    console.log(this.selectedUser);
    
  }

  ngOnInit() {
    this.selectedUser = this.user

    this.adminService.getUsers().subscribe(resp=>{
      if(resp && resp.success){
        this.users = resp.success.Data;
        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');
        this.dynamicScrLoader.loadSingle('trigger-data-table');
      }
    })
  }

  fetchPool(poolId:string){
    this.isLoading =true;
    this.investmentService.getInvestment(poolId).subscribe(poolDetails=>{
      if(poolDetails && poolDetails.success){
        if(poolDetails.success.Data){
          this.pool = poolDetails.success.Data;
          // console.log("i have gat :: "+JSON.stringify(this.pool))
          this.isLoading = false;
        }else{
          this.router.navigate(['./', {}]);
        }
      }else{
        
      }
    })
  }

  modalSubmitted(){
    this.modalButtonTitle='adding...'
    let element = document.getElementById('closeBtn');
    const data = {
      user_email:this.user_email,
      number_of_pools:this.number_of_pools,
      payment_reference:this.reference,
      amount_paid:this.amount_paid
    }
    this.adminService.addUserToPool(data).subscribe(resp=>{
      if(resp && resp.success){
        this.modalButtonTitle='add User';
        element.click();
        this.toastrService.success('User added to pool')
        this.submit.emit(this.modalId);
      }else{
        element.click();
        this.modalButtonTitle='add User';
      }
    })
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(resp => {
      if (resp && resp.success) {
        this.users = resp.success.Data;
      }
      this.isLoading = false;
    });
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
  cancelPool() {
    this.router.navigateByUrl('admin/.poolId');
  }

>>>>>>> new work
=======
>>>>>>> Created Add User to Pool
  filterTable(filterType, filterValue: string) {

    if (!filterValue || filterValue === null) {
      return this.getUsers();
    } else {
        const filtered = this.users.filter(user => {
          if (user[filterType] !== null) {
            return user[filterType].toLowerCase().includes(filterValue.toLowerCase());
          }
        });
        console.log(filtered);
        this.users = filtered;
      }
  }

}
