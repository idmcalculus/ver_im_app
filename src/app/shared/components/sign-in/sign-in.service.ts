import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import {MessageService} from '../../services/message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../../models/user';

const baseUrl = "https://versabackend.adebiyipaul.com/api";
const httpOptions = {
  headers: new HttpHeaders(
      { 'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json'}
    )
};

@Injectable({ providedIn: 'root' })
export class SignInService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ){ }

  login (user: User): Observable<User> {
    let params = new HttpParams();
    params = params.append('email', user.email);
    params = params.append('password', user.password);

    httpOptions["params"]=params;

    return this.http.post<User>(`${baseUrl}/login`,null, httpOptions).pipe(
      tap((loggedInUser: any) => {
        if(loggedInUser.statusCode=='200'){
          alert(`welcome ${loggedInUser.data.email}`)
          return loggedInUser.data;
        }else{
          alert(loggedInUser.message)
          return null;
        }
      }),
      catchError(this.handleError<User>('login'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a SignInService message with the MessageService */
  private log(message: string) {
    alert(message)
    // this.messageService.add(`SignInService: ${message}`);
  }
}
