import {BasicModel} from './BasicModel';
export class ExportData extends BasicModel{
    first_name?:string;
    last_name?:string;
    email?:string;
    phone_number?:number;
    investment_id?:number;
    title?:string;
    category_id?:number;
    expected_return_period?:string;
    investment_amount?:number;
    returned_amount?:number;
    payment_type?:string;
    date?: string;
    date_range?: string;
    date_end?: string;
    date_start?: string;
    activity?: string;
    ip_address?: string;
    no_of_slots?: number;
    max_no_of_slots?: number;
    total_amount_invested?: number;
    no_of_investments?: number;
    viewed?: number;
    percentage?: number;
    total?: number;
}
