import {BasicModel} from './BasicModel';
export class Transaction extends BasicModel{
  payment_reference?: string;
  investment_id?: string;
  amount_paid?: number;
  number_of_pools?: number;
}