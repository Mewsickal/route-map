import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, timer } from 'rxjs';
import { Status, Vehicle } from './interfaces';
import { catchError, map, tap, switchMap, retry, share, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService implements OnDestroy {

  private baseUrl = '/api/';
  private stopPolling = new Subject();
  statuses$: Observable<Status[]>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient
  ) {
    this.statuses$ = timer(1, 3000).pipe(
      switchMap(() => http.get<Status[]>(`${this.baseUrl}status`)),
      retry(),
      tap(console.log),
      share(),
      takeUntil(this.stopPolling)
    );
  }

  getLatestStatus(): Observable<Status[]> {
    return this.statuses$.pipe(
      catchError(this.handleError<Status[]>('getLatestStatus', []))
    );
  }

  getVehicleStatus(vehicleid): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}status/vehicles/${vehicleid}`)
      .pipe(
        catchError(this.handleError<Status[]>('getVehicleStatus', null)
        ));
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}vehicles`, vehicle, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle>('createVehicle'))
    );
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }
}
