/**
 * Structured attack definition for combat talents
 * For talents that generate attacks (actions > 0, reactions, etc.)
 */
export interface AttackDefinition {
  /** Required weapon type */
  weaponType?: 'light' | 'heavy' | 'unarmed' | 'any';

  /** Defense the attack targets */
  // targetDefense: DefenseType;

  /** Attack range */
  range: 'melee' | 'ranged' | 'special';

  /** Base damage dice */
  baseDamage?: string;

  /** Damage type override */
  // damageType?: DamageType;
  targetDefense: 'Physical' | 'Cognitive' | 'Spiritual';

  /** Damage scaling by tier */
  damageScaling?: Array<{ tier: number; damage: string }>;

  /** Conditional advantages */
  conditionalAdvantages?: Array<{ condition: string; value: number }>;

  /** Resource cost (focus, investiture) */
  resourceCost?: { type: 'focus' | 'investiture'; amount: number };

  /** Complex mechanics that can't be fully structured yet */
  specialMechanics?: string[];
}
