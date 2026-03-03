/**
 * Condition effects (application, removal, immunity)
 */
export interface ConditionEffect {
  /** Type of condition effect */
  type: 'apply' | 'ignore' | 'immune' | 'prevent';

  /** Condition name */
  condition: string; // 'Surprised', 'Disoriented', 'Stunned', 'Prone', 'Immobilized', 'Exhausted', 'Slowed', etc.

  /** When this effect triggers */
  trigger?: string; // e.g., "on hit", "when attacked", "while in stance"

  /** Target of the condition (self, target, etc.) */
  target?: 'self' | 'target' | 'all-enemies' | 'all-allies';

  /** Duration if applying a condition */
  duration?: string; // e.g., "end of target's next turn", "1 round", "scene"

  /** Additional condition details */
  details?: string;
}
