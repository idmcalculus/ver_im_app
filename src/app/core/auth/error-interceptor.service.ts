// import { Injectable } from '@angular/core';
// import {
//   HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
// } from '@angular/common/http';

// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//       alert('gets gere')
//         return next.handle(request).pipe(catchError(err => {
//             if (err.status === 400) {
//                 // // auto logout if 401 response returned from api
//                 // this.authenticationService.logout();
//                 // location.reload(true);
//                 console.log('error interceptor :: '+JSON.stringify(err))
//             }
            
//             const error = err.error.message || err.statusText;
//             return throwError(error);
//         }))
//     }
// }
