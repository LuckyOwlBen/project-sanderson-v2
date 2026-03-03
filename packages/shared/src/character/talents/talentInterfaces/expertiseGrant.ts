/**
 * Structured expertise grant from a talent
 * Replaces text parsing of otherEffects for expertise grants
 */
export interface ExpertiseGrant {
  /** Type of grant */
  type: 'fixed' | 'choice' | 'category';

  /** Fixed expertises granted (for type: 'fixed') */
  expertises?: string[];

  /** Number of choices allowed (for type: 'choice') */
  choiceCount?: number;

  /** List of options to choose from (for type: 'choice') */
  options?: string[];

  /** Category to expand (for type: 'category') */
  category?: 'weapon' | 'armor' | 'cultural' | 'utility' | 'specialist';
}
