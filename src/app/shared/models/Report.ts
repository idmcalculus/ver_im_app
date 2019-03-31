import {BasicModel} from './BasicModel';
export class Report extends BasicModel{
    id?:number;
    user_id?:string;
    investment_id?:number;
    title?:string;
    description?:string;
    returned_amount?:number;
    payment_type?:string;
}