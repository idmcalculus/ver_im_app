import {BasicModel} from './BasicModel';
export class Investment extends BasicModel{
  title?: string;
  description?: string;
  category_id?: string;
  max_num_of_slots?: string;
  duration?: string;
  expected_return_period?: string;
  investment_amount?: string;
  opening_date?: string;
  closing_date?: string;
  expected_return_amount?: string;
}