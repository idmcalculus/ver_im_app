import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlutterWaveService {

  constructor(
    private httpService:HttpService
  ) { }


}