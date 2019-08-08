import { Injectable } from '@angular/core';

import {HttpService} from './../../core/http/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpService:HttpService) { 

  }


  fetchChats(){
    this.httpService.postRequest
    return this.httpService.postRequest(`message/fetch_last_message`,{},false);
  }

  sendMessage(recieverId,message){
    this.httpService.postRequest
    return this.httpService.postRequest(`message/send?receiver_id=${recieverId}&message_body=${message}`,{},false);
  }

  fetchMessages(senderId){
    this.httpService.postRequest
    return this.httpService.postRequest(`message/list_all_messages?sender_id=${senderId}`,{},false);
  }

  getChatAdmins(){
    this.httpService.postRequest
    return this.httpService.postRequest(`message/list_admin`,{},false);
  }
}
