import { Injectable } from '@angular/core';
import {HttpService} from '../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Investment } from 'src/app/shared/models/Investment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService:HttpService) { }


  getDashBoardData(){
    return this.httpService.postRequest(`report/adminDashboard`,null);
  }

  getUsers(){
    return this.httpService.postRequest(`user/list`,null);
  }
  

}