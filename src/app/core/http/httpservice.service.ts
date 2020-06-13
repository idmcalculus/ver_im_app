import { Injectable } from '@angular/core';
import {  HttpHeaders, HttpClient  } from '@angular/common/http';
import { Observable, of, observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {environment as appConfig} from '../../../environments/environment';


const httpOptions = {
    headers: new HttpHeaders({
        Accept: 'application/json',
    })
};

@Injectable({ providedIn: 'root' })
export class HttpService {
  headers: any;
  requestOption: any;
  response: {};
  baseURL: string = appConfig['app-live-url'];


    constructor(
        private http: HttpClient,
        private toastrService: ToastrService
    ) { }


    getRequest(api: string, httpHeaderOptions?: {headers: HttpHeaders}): Observable<any> {
        const opts = httpHeaderOptions ? httpHeaderOptions : httpOptions;
        return this.http.get<any>(`${this.baseURL}/${api}`, opts)
        .pipe(
            tap(resp => this.log(resp)),
            catchError(
                this.handleError<any>(api, [])
            )
        );
    }

    postRequest(api: string, data: any, showMessages?: boolean, httpHeaderOptions?: {headers: HttpHeaders}): Observable<any>  {
        const opts = httpHeaderOptions ? httpHeaderOptions : httpOptions;
        return this.http.post<any>(`${this.baseURL}/${api}`, data, opts)
        .pipe(
            tap(resp => this.log(resp, showMessages)),
            catchError(
                this.handleError<any>(api, {})
            )
        );
    }


    async postExpressRequest(api: string, data: any, showMessages?: boolean, httpHeaderOptions?: {headers: HttpHeaders}): Promise<any> {
        //const hashString = "XPPUBK-01445c39c4095df9b08f566a82586d7c-X"; // LIVE
        const hashString = "XPPUBK-57f22bfb5ef594e90278be1abffb5ed2-X";// TEST
        const response = await fetch(`https://xpresspayonlineapisandbox.xpresspayments.com/v1/payments/query`,{
        //const response = await fetch(`https://api.xpresspayonline.com/v1/payments/query`,{
            method: 'POST', 
            body: JSON.stringify({"publicKey":hashString,"transactionId":data.transactionId}),
            headers: {'Content-Type':'application/json'}
        }) // Call the fetch function passing the url of the API as a parameter
        .then(function(res) {
            return res.json().then(json => {
                // the status was ok and there is a json body
                return json
        }).catch(function(e) {
            console.log(e)
            // This is where you run code if the server returns any errors
            });     
        });

        return response;
    }

    putRequest(api: string, data: any) {
        return this.http.put<any>(`${this.baseURL}/${api}`, data, httpOptions)
        .pipe(
            tap(resp => this.log(resp)),
            catchError(
                this.handleError<any>(api, {})
            )
        );
    }

    deleterequest() {

    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            JSON.stringify(error);
            if (error.status == 0) {
                console.log('Error occurred is:: '+ JSON.stringify(error));
                this.toastrService.error(`Error occurred connecting to services`);
            } else {
                if (error.error && error.error.errors) {
                    let obj = error.error.errors;
                    obj = Object.values(obj);
                    for (let i = 0; i < obj.length; i++) {
                        this.toastrService.error(obj[i]);
                    }
                } else if (error.error && error.error.error) {
                    if (error.error.error.message) {
                        this.toastrService.error(error.error.error.message);
                    } else if (error.error.error.Message) {
                        this.toastrService.error(error.error.error.Message);
                    }
                } else {

                }
            }
            return of(result as T);
        };
    }

    private log(message: any, alertMessage?: boolean) {
        if (alertMessage) {
            if (message.success.Message) {
                this.toastrService.success(message.success.Message);
            } else if (message.success.message) {
                this.toastrService.success(message.success.message);
            }

        }

    }
}
