import {BasicModel} from './BasicModel';
export class Career extends BasicModel{
    career_title?:string;
    career_description?:string;
    deadline?:string;
    position_type?:string;
    number_of_application?:string;
    career_responsibilities?:any;
    career_requirements?:any;
}