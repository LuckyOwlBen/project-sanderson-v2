/**
 * Structured trait grant/modification from a talent
 * Allows talents to add traits to specific items or categories
 */
export interface TraitGrant {
  /** Items this grant applies to */
  targetItems: string[] | 'all' | { category: string };

  /** Traits to add */
  traits: string[];

  /** Whether these are expert traits (require expertise) */
  expert: boolean;
}
