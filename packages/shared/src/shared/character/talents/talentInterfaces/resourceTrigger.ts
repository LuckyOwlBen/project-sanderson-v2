/**
 * Resource triggers (focus recovery, investiture manipulation, etc.)
 */
export interface ResourceTrigger {
  /** Resource affected */
  resource: 'focus' | 'investiture' | 'health';

  /** Effect type */
  effect: 'recover' | 'spend' | 'reduce-cost';

  /** Amount (can be formula) */
  amount: number | string; // number or formula like "tier" or "1 + tier"

  /** When this trigger activates */
  trigger: string; // e.g., "on kill", "on hit", "start of turn", "when you miss"

  /** Frequency limitation */
  frequency?: 'once-per-round' | 'once-per-scene' | 'unlimited';

  /** Condition for the trigger */
  condition?: string;
}
