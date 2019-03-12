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
export class SignUpService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ){ }

  register (user: User): Observable<User> {
    let params = new HttpParams();
    params = params.append('email', user.email);
    params = params.append('password', user.password);
    params = params.append('authentication_type', 'E');
    params = params.append('first_name', user.password);
    params = params.append('last_name', user.password);
    params = params.append('user_category', 'Admin');

    httpOptions["params"]=params;

    return this.http.post<User>(`${baseUrl}/register`,null, httpOptions).pipe(
      tap((loggedInUser: any) => {
        if(loggedInUser.success && loggedInUser.success.StatusCode==200){
          alert(loggedInUser.success.Message)
          return loggedInUser.data;
        }else{
          alert(loggedInUser.message)
          return null;
        }
      }),
      catchError(this.handleError<User>('Registeration'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.statusText){
        this.log(`${operation} failed: ${error.statusText}`);
      }
      return of(result as T);
    };
  }

  /** Log a SignUpService message with the MessageService */
  private log(message: string) {
    alert(message)
    // this.messageService.add(`SignUpService: ${message}`);
  }
}
