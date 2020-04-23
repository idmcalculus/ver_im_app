import {BasicModel} from './BasicModel';
export class ExportData extends BasicModel{
    user_id?:string;
    investment_id?:number;
    title?:string;
    description?:string;
    returned_amount?:number;
    payment_type?:string;
    date?: string;
    activity?: string;
    ip_address?: string;
}
