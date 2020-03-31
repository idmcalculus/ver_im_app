import {BasicModel} from './BasicModel';
export class Investment extends BasicModel{
  title?: string;
  description?: string;
  category_id?: number;
  max_num_of_slots?: number;
  is_investment_started?:string;
  duration?: string;
  expected_return_period?: string;
  investment_amount?: number;
  opening_date?: string;
  closing_date?: string;
  show_publicly?: boolean=false;
  is_investment_ended?: string;
  investment_ended_date?:string;
  expected_return_amount?: string;
  num_of_pools_taken?:number;
  reference?:string;
  investment_image?:string;
  estimated_percentage_profit?:string;
}
