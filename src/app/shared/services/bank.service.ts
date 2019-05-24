import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { Observable } from 'rxjs';
import {Config as appConfig} from '../../config/app-config';

@Injectable({ providedIn: 'root' })
export class BankService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  constructor(private httpService:HttpService){

  }

  fetchBankList(){
    return new Observable<any>(observable=>{
      this.httpService.baseURL = appConfig["app-live-url"];
      this.httpService.postRequest('bank/list',{},null)
      .subscribe(resp=>{
          if(resp){
              observable.next(resp);
          }
      })
    })
  }
}