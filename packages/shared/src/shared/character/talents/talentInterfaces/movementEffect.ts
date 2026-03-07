/**
 * Movement effects and modifications
 */
export interface MovementEffect {
  /** Type of movement effect */
  type: 'increase-rate' | 'special-movement' | 'ignore-terrain' | 'teleport';

  /** Amount of movement (in feet) or formula */
  amount?: number | string;

  /** When this movement is available */
  timing?: 'before-attack' | 'after-attack' | 'as-part-of-action' | 'always';

  /** Special movement type */
  movementType?: 'walk' | 'leap' | 'climb' | 'swim' | 'fly';

  /** Additional restrictions or conditions */
  condition?: string; // e.g., "ignore difficult terrain", "can move through enemies"

  /** Action cost of the movement */
  actionCost?: 'free' | 'part-of-action' | 'full-action';
}
