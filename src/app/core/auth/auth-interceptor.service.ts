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
    const authReq = req.clone({
        headers: req.headers.set('Authorization',`Bearer ${authToken}`)
    });

    return next.handle(authReq);
  }
}
