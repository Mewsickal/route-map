import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = '/api/';

  constructor(
    private http: HttpClient
  ) { }

  getLatestStatus(): Observable<Response> {
    return this.http.get<any>(`${this.baseUrl}status`)
  }
}
