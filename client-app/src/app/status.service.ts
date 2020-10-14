import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Status, Vehicle } from './interfaces';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = '/api/';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient
  ) { }

  getLatestStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}status`)
      .pipe(
        catchError(this.handleError<Status[]>('getLatestStatus', []))
      );
  }
}
