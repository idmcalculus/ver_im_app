import {BasicModel} from './BasicModel';
export class Investment extends BasicModel{
    password: string;
    token?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone_number?: string;
    gender?: string;
    authentication_type?: string;
    user_category?: string;
    home_address?: string;
    profile_picture?: string;
    country?: string;
    month_of_birth?: string;
    year_of_birth?: string;
    day_of_birth?: string;
    email_is_verified?: number;
    email_verified_at?: string;
    account_name?: string;
    account_number?: string;
    bank_name?: string;
    updates_on_new_plans?: number;
    email_updates_on_investment_process?: number;
  }