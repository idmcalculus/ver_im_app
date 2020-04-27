import {BasicModel} from './BasicModel';
export class Report extends BasicModel{
    user_id?: string;
    investment_id?: number;
    title?: string;
    description?: string;
    returned_amount?: number;
    payment_type?: string;
    report_id?: number;
}
