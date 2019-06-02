import {BasicModel} from './BasicModel';
export class Applicant extends BasicModel{
    career_id?:string;
    first_name?:string;
    last_name?:string;
    email?:string;
    phone_number?:string;
    career_brief?:string;
    curriculum_vitae ?:any;
}