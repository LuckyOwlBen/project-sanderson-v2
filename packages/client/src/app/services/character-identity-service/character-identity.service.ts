import { Injectable } from '@angular/core';
import { IdentityResponse } from '@project-sanderson/shared/dtos/responses/identityResponse';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api-service/api-service';

/**
 * CharacterIdentityService
 *
 * Manages the current active character ID for the application.
 * This service acts as a single source of truth for which character
 * is currently being viewed/edited, allowing components to reference
 * the character ID for API calls without passing it through component hierarchies.
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterIdentityService {
  private currentCharacterIdSubject = new BehaviorSubject<string | null>(null);
  private waitingForIdentitySubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable stream of the current character ID
   * Components can subscribe to this to react to character changes
   */
  public currentCharacterId$: Observable<string | null> =
    this.currentCharacterIdSubject.asObservable();

  /**
   * Observable stream indicating if the service is waiting for backend to return a character ID
   * Components can use this to show loading states while the ID is being created
   */
  public waitingForIdentity$: Observable<boolean> = this.waitingForIdentitySubject.asObservable();

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
    // Try to restore character ID from sessionStorage on service initialization
    const storedId = sessionStorage.getItem('currentCharacterId');
    if (storedId) {
      this.currentCharacterIdSubject.next(storedId);
    }
  }

  /**
   * Get the current character ID synchronously
   * @returns The current character ID, or null if none is set
   */
  getCurrentCharacterId(): string | null {
    return this.currentCharacterIdSubject.value;
  }

  /**
   * Set the current active character ID
   * Persists to sessionStorage and notifies all subscribers
   * @param characterId - The character ID to set as active, or null to clear
   */
  setCurrentCharacterId(characterId: string | null): void {
    this.currentCharacterIdSubject.next(characterId);

    if (characterId) {
      sessionStorage.setItem('currentCharacterId', characterId);
    } else {
      sessionStorage.removeItem('currentCharacterId');
    }
  }

  /**
   * Clear the current character ID
   * Useful when logging out or returning to character selection
   */
  clearCurrentCharacterId(): void {
    this.setCurrentCharacterId(null);
  }

  /**
   * Check if a character is currently active
   * @returns true if a character ID is set, false otherwise
   */
  hasActiveCharacter(): boolean {
    return this.currentCharacterIdSubject.value !== null;
  }

  /**
   * Create a new character asynchronously
   * Sets a waiting flag, calls the backend to create the character,
   * then updates the current ID once the backend returns
   *
   * @returns Observable that emits when the character ID is set
   */
  newIdentity(): Observable<IdentityResponse> {
    this.waitingForIdentitySubject.next(true);
    return this.apiService.callApi<IdentityResponse>('identity/new', 'GET').pipe(
      tap((response) => {
        this.setCurrentCharacterId(response.id);
        this.waitingForIdentitySubject.next(false);
      })
    );
  }
}
