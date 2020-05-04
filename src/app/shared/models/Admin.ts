import { BasicModel } from './BasicModel';

export class Admin extends BasicModel{
    last_name?: string;
    first_name?: string;
    authentication_type?: string;
    password?: string;
    user_category?: string;
    email?: string
    
}