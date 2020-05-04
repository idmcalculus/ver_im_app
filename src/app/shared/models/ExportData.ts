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
    activity?: string;
    ip_address?: string;
}
