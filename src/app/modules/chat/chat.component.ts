import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  
  admins:[User];
  constructor(private chatService:ChatService) { }

  ngOnInit() {
      this.chatService.getChatAdmins().subscribe(admins=>{
        if(admins.success.Data){
          this.admins = admins.success.Data;
        }
        
      })
  }




}
