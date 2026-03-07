import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api-service';
import { AncestryResponse } from '@project-sanderson/shared/dtos/responses/ancestryResponse';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AncestryService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setAncestry(characterId: string, ancestryId: string): Observable<void> {
    return this.apiService.callApi<void>('/ancestry/set', 'POST', { characterId, ancestryId });
  }

  getAncestry(characterId: string): Observable<AncestryResponse | null> {
    return this.apiService.callApi<AncestryResponse>('/ancestry/get', 'GET', { characterId }).pipe(
      catchError((err) => {
        console.error('Error fetching ancestry from API:', err);
        return of(null); // Return null on error
      })
    );
  }
}
