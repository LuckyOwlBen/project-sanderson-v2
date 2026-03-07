import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private useServer = false; // Will auto-detect
  private serverAvailable: Observable<boolean> = of(false); // Will be set after health check
  // In production, API is served from same origin (no CORS needed)
  // In dev mode, backend runs on port 3000, frontend on 4200
  private apiUrl =
    window.location.hostname === 'localhost' && window.location.port === '4200'
      ? 'http://localhost:3000/api/' // Dev mode
      : '/api/'; // Production mode

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkServerAvailability();
  }
  private checkServerAvailability(): void {
    // Quick health check
    const healthUrl = this.apiUrl + 'health';
    this.http
      .get(healthUrl, { observe: 'response' })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
      .subscribe((available: boolean) => {
        this.serverAvailable = of(available);
        this.useServer = available;
        if (!available) {
          this.router.navigate(['/error-404']);
        } else {
          console.log('Backend server detected, using API');
        }
      });
  }

  isServerAvailable(): Observable<boolean> {
    return this.serverAvailable;
  }

  callApi<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: unknown
  ): Observable<T> {
    if (!this.useServer) {
      this.router.navigate(['/error-404']);
      return of(null as unknown as T); // Return an observable that emits null
    }
    switch (method) {
      case 'GET':
        return this.apiGet(endpoint, body as HttpParams);
      case 'POST':
        return this.apiPost(endpoint, body);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  private apiGet<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = this.apiUrl + endpoint;
    return this.http.get<T>(url, { params });
  }

  private apiPost<T>(endpoint: string, body: unknown): Observable<T> {
    const url = this.apiUrl + endpoint;
    return this.http.post<T>(url, body);
  }
}
