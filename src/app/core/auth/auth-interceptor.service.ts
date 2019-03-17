import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { DatasharerService } from './../datasharer/datasharer.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dataSharerService: DatasharerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log("am intercepting: fir")
    const authToken = this.dataSharerService.getAuthorizationToken();
    // console.log("am intercepting: "+authToken)
    const authReq = req.clone({
        headers: req.headers.set('Authorization',`Bearer ${authToken}`)
    });

    // const authReq = req.clone({ setHeaders: { Authorization: `Basic ${authToken}` } });
    // console.log("issh is: "+JSON.stringify(authReq))
    return next.handle(authReq);
  }
}
