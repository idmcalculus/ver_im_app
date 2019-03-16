import { Injectable } from '@angular/core';
import {  HttpHeaders,HttpClient  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({ 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept':'application/json'
    })
};

@Injectable({ providedIn: 'root' })
export class HttpService {
  headers: any;
  requestOption:any;
  response:{};
  baseURL:string = "https://versabackend.adebiyipaul.com/api";
  

    constructor(
        private http: HttpClient
    ) { }


    getRequest(api:string) : Observable<any> {
        return this.http.get<any>(api)
        .pipe(
            tap(resp=> this.log('fetched heroes'+resp)),
            catchError(
                this.handleError<any>(api, [])
            )
        );    
    }

    postRequest(api:string,data:any):Observable<any>  {
        return this.http.post<any>(`${this.baseURL}/${api}`,data,httpOptions)
        .pipe(
            tap(resp=> this.log('fetched heroes'+resp)),
            catchError(
                this.handleError<any>(api,null)
            )
        );  
    }

    putRequest(api:string,data:any) {
        return this.http.put<any>(`${this.baseURL}/${api}`,data,httpOptions)
        .pipe(
            tap(resp => this.log('fetched heroes'+resp)),
            catchError(
                this.handleError<any>(api,{})
            )
        );  
    }

    deleterequest(){
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log("issue is: "+JSON.stringify(error.error))
            if(error.error.errors){
                alert(error.error.errors.authentication_type[0])
            }else if(error.error.error){
                alert(error.error.error.Message)
            }
        //   alert(error.error.error.Message); // log using message service instead
          return of(result as T);

        };
    }

    private log(message: string) {
        console.log(`HeroService: ${message}`);
    }
}
