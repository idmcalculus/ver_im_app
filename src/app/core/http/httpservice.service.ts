import { Injectable } from '@angular/core';
import {  HttpHeaders, HttpClient  } from '@angular/common/http';
import { Observable, of, observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


const httpOptions = {
    headers: new HttpHeaders({
        Accept: 'application/json'
    })
};

@Injectable({ providedIn: 'root' })
export class HttpService {
  headers: any;
  requestOption: any;
  response: {};
  baseURL = 'https://versabackend.adebiyipaul.com/api';


    constructor(
        private http: HttpClient,
        private toastrService: ToastrService
    ) { }


    getRequest(api: string, httpHeaderOptions?: {headers: HttpHeaders}): Observable<any> {
        const opts = httpHeaderOptions ? httpHeaderOptions : httpOptions;
        return this.http.get<any>(`${this.baseURL}/${api}`, opts)
        .pipe(
            tap(resp => this.log('GET=> response :: ' + resp)),
            catchError(
                this.handleError<any>(api, [])
            )
        );
    }

    postRequest(api: string, data: any, httpHeaderOptions?: {headers: HttpHeaders}): Observable<any>  {
        const opts = httpHeaderOptions ? httpHeaderOptions : httpOptions;
        return this.http.post<any>(`${this.baseURL}/${api}`, data, opts)
        .pipe(
            tap(resp => this.log('POST=> response :: ' + resp)),
            catchError(
                this.handleError<any>(api, {})
            )
        );
    }

    putRequest(api: string, data: any) {
        return this.http.put<any>(`${this.baseURL}/${api}`, data, httpOptions)
        .pipe(
            tap(resp => this.log('PUT=> response :: ' + resp)),
            catchError(
                this.handleError<any>(api, {})
            )
        );
    }

    deleterequest() {

    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log('ishh 1 ' + JSON.stringify(error));
            console.log('ishh 2' + JSON.stringify(operation));
            console.log('ishh 3 ' + JSON.stringify(result));
            if (error.status === 0) {
                // alert('Could not connect to services')
                console.log('Error occurred is:: ' + JSON.stringify(error));
                this.toastrService.error(`Error occurred connecting to services`);
            } else {
                if (error.error && error.error.errors) {
                    this.toastrService.error(JSON.stringify(error.error.errors));
                } else if (error.error && error.error.error) {
                    if (error.error.error.message) {
                        this.toastrService.error(error.error.error.message);
                    } else {
                        this.toastrService.error(JSON.stringify(error.error.error.Message));
                    }
                }
            }
            return of(result as T);
        };
    }

    private log(message: string) {
        // console.log(`HeroService: ${message}`);
    }
}
