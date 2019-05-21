import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

// import { DatasharerService } from './../datasharer/datasharer.service';
import {AppAuthService} from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AppAuthService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var token = localStorage.getItem('token');
    const authToken = token ? token:'';
    if(req.url.includes('api.cloudinary.com')){
      req.headers.delete
      return next.handle(req)
    }else if(req.url.includes('versa')){
      const authReq = req.clone({
          headers: req.headers.
          set('Authorization',`Bearer ${authToken}`).
          set('Content-Type','application/x-www-form-urlencoded')          
      });
      return next.handle(authReq);
    }else{
      // console.log('senedin :: '+JSON.stringify(req.body))
      // console.log('senedin :: '+JSON.stringify(req.urlWithParams))
      console.log('senedin :: '+JSON.stringify(req.headers.get('Authorization')))
      // // const authReq = req.clone({
      // //     headers: req.headers.
      // //     set('Content-Type','application/x-www-form-urlencoded')          
      // // });
      // // return next.handle(authReq);
      return next.handle(req)
    }
    
  }


}
