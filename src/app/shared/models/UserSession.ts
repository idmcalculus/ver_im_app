import {User} from './user';
export class UserSession extends User {
    isValid?:boolean=false;
    sessionId?: string;
    last_login_at?: Date;
    last_logged_out?: Date;
  }