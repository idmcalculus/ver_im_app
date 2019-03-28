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


  // adInvestment(investment:Investment):Observable<any>{
  //   return this.httpService.postRequest(`investment/create?
  //   title=${investment.title}&description=${investment.description}
  //   &category_id=${investment.category_id}&max_num_of_slots=${investment.max_num_of_slots}
  //   &duration=${investment.duration}&expected_return_period=${investment.expected_return_period}&
  //   investment_amount=${investment.investment_amount}
  //   &expected_return_amount=${investment.expected_return_amount}&investment_image=${investment.investment_image}`,null);
  // }

  getDashBoardData(){
    return this.httpService.postRequest(`report/adminDashboard`,null);
  }

  getUsers(){
    return this.httpService.postRequest(`user/list`,null);
  }
  

}