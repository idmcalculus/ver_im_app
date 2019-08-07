import { Injectable } from '@angular/core';

import {HttpService} from './../../core/http/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpService:HttpService) { 

  }


  fetchMessages(){


  }

  sendMessage(){


  }

  fetchLastMessage(){


  }

  getChatAdmins(){
    this.httpService.postRequest
    return this.httpService.postRequest(`message/list_admin`,{},true);
  }
}
