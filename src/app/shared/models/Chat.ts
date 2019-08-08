import {BasicModel} from './BasicModel';
export class Chat extends BasicModel{
    receiver_id?:string;
    sender_id?:string;
    message_body?:string;
}