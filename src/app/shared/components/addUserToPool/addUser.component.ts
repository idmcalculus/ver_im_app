import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Report } from '../../models/Report';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../../modules/admin/admin.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import {addUserService} from './addUser.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pool-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})

export class AddUserComponent implements OnInit {
  isPaymentreport:boolean=false;
  number_of_pools:number;
  isLoading:boolean=true;
  reference:string='';
  user_email:string='';
  amount_paid:number;

  users:[User]
  @Input() public modaltitle:string;
  @Input() public modalButtonTitle:string;
  @Input() public modalData:any;
  @Input() public modalId:any;
  @Output() submit = new EventEmitter<any>();

  constructor(
    private addUserService:addUserService,
    private toastrService: ToastrService,
    private dynamicScrLoader:DynamicScriptLoaderService,
    private adminService:AdminService,
  ) {


  }

  ngOnInit() {
    this.adminService.getUsers().subscribe(resp=>{
      if(resp && resp.success){
        this.users = resp.success.Data;
        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');
        this.dynamicScrLoader.loadSingle('trigger-data-table');
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
      investment_id:this.modalId,
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

}
