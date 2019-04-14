import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

// import { DatasharerService } from './../datasharer/datasharer.service';
import {AuthService} from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var token = localStorage.getItem('token');
    const authToken = token ? token:'';
    if(req.url.includes('api.cloudinary.com')){
      req.headers.delete
      return next.handle(req)
    }else{
      const authReq = req.clone({
          headers: req.headers.
          set('Authorization',`Bearer ${authToken}`).
          set('Content-Type','application/x-www-form-urlencoded')          
      });
      return next.handle(authReq);
    }
  }
}
