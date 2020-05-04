import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Report } from '../../../../shared/models/Report';
import { User } from 'src/app/shared/models/user';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute,Router} from '@angular/router';
import { AdminService } from '../../admin.service';
import {InvestmentService} from '../../../investment/investment.service'
import { UserService } from '../../../user/user.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import { addUserService } from './addUser.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pool-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})

export class AddUserComponent implements OnInit {
  pool:any;
  poolId:number=0;
  buttonText = 'Add';
  categories: any;
  isPaymentreport:boolean=false;
  number_of_pools:number;
  investment_amount: number;
  isLoading:boolean=true;
  validpoolError:string;
  reference:string='';
  user_email: '';
  amount_paid:number;
  users:User[]=[];
  user:User = {email: '',};
  selectedUser:User = {email: '',};

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private addUserService:addUserService,
    private toastrService: ToastrService,
    private dynamicScrLoader:DynamicScriptLoaderService,
    private investmentService:InvestmentService,
    private adminService:AdminService,
    private userService:UserService,
    private location: Location,
  ) {
    this.route.params.subscribe(resp=>{
      this.poolId = resp.pool_id;
      if(!this.poolId){
        this.poolId = Number(this.route.snapshot.paramMap.get('id'));
      }
      this.fetchPool(String(this.poolId));
    });
    this.getCategories();
  }

  cancelPool() {
    this.location.back()
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    console.log(this.selectedUser);
  }

  validPool(pool) {
    if (this.number_of_pools != 0){ 
    const remain = this.pool.investment.max_num_of_slots - this.pool.investment.num_of_pools_taken
    const want = this.number_of_pools

    if(want > remain) {
      console.log('Exceeded');
      this.validpoolError = 'Number of Pools Exceeded';  
    } else {
      this.validpoolError ='';
    }
  } 
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
    });
  }

  getCategories() {
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
      }
      this.isLoading = false;
    });
  }

  getCategoryName(id) {
    // console.log(this.categories,'=====>')
    const res = this.categories.find( r => r.id === id);
    return res.category_name;
  }

  fetchPool(poolId:string){
    this.isLoading =true;
    this.investmentService.getInvestment(poolId).subscribe(poolDetails=>{
      if(poolDetails && poolDetails.success){
        if(poolDetails.success.Data){
          this.pool = poolDetails.success.Data;
          // console.log("i have gat :: "+JSON.stringify(this.pool))
         this.validPool(this.pool);

          this.isLoading = false;
        }else{
          this.router.navigate(['./', {}]);
        }
      }else{

      }
    })
  }
  addUserToPool(){
    console.log( this.pool);
  
    const data = {
      user_email:this.selectedUser.email,
      number_of_pools:this.number_of_pools,
      investment_id:this.poolId,
      amount_paid: this.calculateEstimate(this.pool.investment.investment_amount,this.number_of_pools)
    }

    this.buttonText = 'Investing'
    this.adminService.addUserToPool(data).subscribe(resp=>{
      if(resp && resp.success){
        //this.modalButtonTitle='add User';
        this.toastrService.success('User added to pool')
      }
      this.buttonText='Invested'
      this.location.back()
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

  calculateEstimate(returns,inv){
    //console.log(returns , inv);

    const estimate = returns * inv;
    return estimate;

  }

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
