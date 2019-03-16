import {User} from '../models/user';
export class UserSession extends User {
    id?: number;
    isValid:boolean=false;
    sessionId?: string;
    last_login_at?: Date;
    last_logged_out?: Date;
  }