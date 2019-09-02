import { Injectable } from '@angular/core';
import {HttpService} from '../../core/http/httpservice.service';
import { Career } from 'src/app/shared/models/Career';
import { CareerApplication } from 'src/app/shared/models/CareerApplication';
// import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private httpService:HttpService) { }


  getCareers(){
    return this.httpService.postRequest(`career/list`,null);
  }  

  //Admin
  getCareerById(id:string){
    return this.httpService.postRequest(`career_application/show
    ?career_application_id=${id}`,null);
  }

  //Admin
  deleteCareerById(id:string){
    var reqBody = {"career_application_id": Number(id)};
    console.log("value is :: "+JSON.stringify(reqBody))
    return this.httpService.postRequest(`career_application/delete`,reqBody,true);
  }

  //Admin
  shortListCareerById(id:Number,shortlist:boolean){
    var reqBody = {"career_application_id": id,"shortlist":shortlist};
    return this.httpService.postRequest(`career_application/shortlist`,reqBody,true);
  }

  createCareer(careerData:Career){
    return this.httpService.postRequest(`career/create?career_title=${careerData.career_title}&career_description=${careerData.career_description}
    &deadline=${careerData.deadline}&position_type=${careerData.position_type}&number_of_application=${careerData.number_of_application}
    &career_responsibilities=${careerData.career_responsibilities}`,null,true);
  }

  applyForCareer(careerApplication:CareerApplication){
    return this.httpService.postRequest(`career_application/create?
    first_name=${careerApplication.first_name}
    &last_name=${careerApplication.last_name}
    &email=${careerApplication.email}
    &career_id=${careerApplication.career_id}
    &phone_number=${careerApplication.phone_number}
    &career_brief=${careerApplication.career_brief}
    &curriculum_vitae=${careerApplication.cv_base64}`,true,null);
  }

  getCareerApplications(){
    return this.httpService.postRequest(`career_application/list`,null);
  }

}