import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, filter } from 'rxjs';
import { Ancestry } from '@project-sanderson/shared/character/ancestry/ancestry';
import { AncestryService } from '../../services/ancestry-service/ancestry-service';
import { CharacterIdentityService } from '../../services/character-identity-service/character-identity.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface AncestryInfo {
  type: Ancestry;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  imagePlaceholder: string;
}

@Component({
  selector: 'app-ancestry-selector',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './ancestry-selector.html',
  styleUrl: './ancestry-selector.scss',
})
export class AncestrySelector implements OnInit, OnDestroy {
  private readonly STEP_INDEX = 0; // Ancestry is step 0
  private destroy$ = new Subject<void>();

  selectedAncestry: Ancestry | null = null;
  Ancestry = Ancestry; // Expose enum to template
  isLoading: boolean = false;
  isWaitingForIdentity: boolean = false;

  ancestries: AncestryInfo[] = [
    {
      type: Ancestry.HUMAN,
      title: 'Human',
      shortDesc: 'The most common people of Roshar',
      fullDesc:
        'Humans are the dominant species on Roshar, having arrived on the world long ago. They inhabit every corner of the planet, from the storm-battered eastern kingdoms to the sheltered western lands of Shinovar. Humans display tremendous diversity in culture, appearance, and ambition.',
      features: [
        'Versatile and adaptable to any role',
        'Can pursue any path or profession',
        'Most common ancestry across Roshar',
        'Wide variety of cultures and traditions',
      ],
      imagePlaceholder: 'account_circle',
    },
    {
      type: Ancestry.SINGER,
      title: 'Singer',
      shortDesc: 'Ancient inhabitants with the ability to change forms',
      fullDesc:
        'Singers are humanoid beings with distinctive carapace armor and the extraordinary ability to assume different forms during highstorms by bonding with spren. Once called parshendi or parshmen, they are the original inhabitants of Roshar. In their various forms, singers can adapt their physical and mental capabilities to suit different roles in society.',
      features: [
        'Can change forms during highstorms',
        'Natural carapace provides protection',
        "Unique connection to Roshar's rhythms",
        'Access to specialized form abilities',
        'Ancient heritage predating humans',
      ],
      imagePlaceholder: 'psychology',
    },
  ];

  constructor(
    private router: Router,
    private ancestryService: AncestryService,
    private identityService: CharacterIdentityService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Monitor the waiting flag from identity service
    this.identityService.waitingForIdentity$.pipe(takeUntil(this.destroy$)).subscribe((waiting) => {
      this.isWaitingForIdentity = waiting;
    });

    // Once we have a character ID, lazy load ancestry from API
    this.identityService.currentCharacterId$
      .pipe(
        takeUntil(this.destroy$),
        filter((id) => id !== null) // Only proceed when ID exists
      )
      .subscribe((characterId) => {
        if (characterId) {
          this.loadAncestryFromApi(characterId);
        }
      });
  }

  private loadAncestryFromApi(characterId: string): void {
    console.log('[AncestrySelector] Loading ancestry from API for character:', characterId);
    this.ancestryService
      .getAncestry(characterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ancestry) => {
          console.log('[AncestrySelector] Received ancestry from API:', ancestry);
          if (ancestry) {
            this.selectedAncestry = ancestry.ancestry;
          } else {
            this.selectedAncestry = null;
          }
          this.isWaitingForIdentity = false;
          console.log('[AncestrySelector] Updated selectedAncestry:', this.selectedAncestry);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('[AncestrySelector] Error loading ancestry from API:', err);
          this.selectedAncestry = null;
          this.isWaitingForIdentity = false;
          this.cdr.detectChanges();
          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectAncestry(ancestry: Ancestry): void {
    this.selectedAncestry = ancestry;
  }

  navigateNext(): void {
    this.router.navigate(['/character-creator-view/culture']);
  }

  // Persist hook for CharacterCreatorView
  public persistStep(): void {
    console.log('[AncestrySelector] persistStep called');
    this.identityService.currentCharacterId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((characterId) => {
        if (!characterId) {
          console.warn('[AncestrySelector] No character ID available for saving');
          return;
        }

        if (!this.selectedAncestry) {
          console.warn('[AncestrySelector] No ancestry selected for saving');
          return;
        }

        console.log(
          '[AncestrySelector] Saving ancestry:',
          this.selectedAncestry,
          'for character:',
          characterId
        );
        this.isLoading = true;
        this.ancestryService
          .setAncestry(characterId, this.selectedAncestry)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              console.log('[AncestrySelector] Ancestry saved to server');
              this.isLoading = false;
            },
            error: (error) => {
              console.error('[AncestrySelector] Failed to save ancestry:', error);
              this.isLoading = false;
              this.router.navigate(['/']);
            },
          });
      });
  }
}
