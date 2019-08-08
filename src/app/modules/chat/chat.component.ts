import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ChatService } from './chat.service';
import { Chat } from 'src/app/shared/models/Chat';
import { Message } from 'src/app/shared/models/Messages';
import { Subscription } from 'rxjs';
import { AppAuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  
  admins:any=[];
  chats:any=[];
  messages:[Message];
  activeRecipient:User;
  loggedInUser:User;
  currentUserSubscription:Subscription;
  constructor(
    private chatService:ChatService,
    private authService:AppAuthService) { 

  }

  ngOnInit() {
      this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
          this.loggedInUser = user;
      });
      this.fetchChats();
      this.fetchAdmins();
  }


  sendMessage(){

  }

  fetchChats(){
    this.chatService.fetchChats().subscribe(resp=>{
      if(resp.success.Data){
        this.chats.push(resp.success.Data);
        console.log(JSON.stringify(this.chats))
      }
    })
  }

  fetchAdmins(){
    this.chatService.getChatAdmins().subscribe(admins=>{
      if(admins.success.Data){
        this.admins = admins.success.Data;
      }
      
    })
  }

  fetchChatMessages(recipientId:string){
    this.chatService.fetchMessages(recipientId).subscribe(messages=>{
      
      console.log("i gat it :: "+JSON.stringify(messages))
      // if(messages.success.Data){
      //   this.messages = messages.success.Data;
      // }
      
    })
  }

  setActiveRecipient(chat){
    var recipientEmail = this.loggedInUser.email==chat.sender_id?chat.receiver_id:chat.sender_id;
    this.admins.forEach(element => {
      if(element.email==recipientEmail){
        this.activeRecipient = element;
        this.fetchChatMessages(this.activeRecipient.email);
        return;
      }
    });
    
  }




}
