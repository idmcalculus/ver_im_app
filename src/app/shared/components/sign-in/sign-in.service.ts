import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MessageService} from '../../services/message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../../models/user';

const baseUrl = "http://versabackend.adebiyipaul.com/api";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Accept': 'application/json'})
};

@Injectable({ providedIn: 'root' })
export class SignInService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** POST: add a new hero to the server */
  login (user: User): Observable<User> {
    return this.http.post<User>(`${baseUrl}/login?email=${user.email}&password=${user.password}`,{}, httpOptions).pipe(
      tap((newHero: User) => alert(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<User>('addHero'))
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
