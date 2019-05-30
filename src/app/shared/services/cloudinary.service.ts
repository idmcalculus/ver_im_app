import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { Observable } from 'rxjs';
import {Config as appConfig} from '../../config/app-config'

@Injectable({ providedIn: 'root' })
export class CloudinaryService {

  constructor(
    private httpService:HttpService
  ) { }

  upload(base64SString: string) {
    return new Observable<any>(observable=>{
      this.httpService.baseURL = appConfig.cloudinary.url
      var data = {
          "file":base64SString,
          "upload_preset": appConfig.cloudinary.upload_preset
      }
      this.httpService.postRequest(appConfig.cloudinary.uploadUrl,data,null)
      .subscribe(resp=>{
          this.httpService.baseURL = appConfig["app-live-url"];
          if(resp){
              observable.next(resp.secure_url);
          }
      })
    })
  }
}