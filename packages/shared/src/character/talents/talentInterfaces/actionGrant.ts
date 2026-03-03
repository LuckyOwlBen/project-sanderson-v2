/**
 * Action economy grants
 * For talents that grant additional actions or reactions
 */
export interface ActionGrant {
  /** Type of action granted */
  type: 'action' | 'reaction' | 'free-action';

  /** Number of actions/reactions granted */
  count: number;

  /** When the action is granted */
  timing?: 'start-of-combat' | 'start-of-turn' | 'end-of-turn' | 'always';

  /** Restriction on what the action can be used for */
  restrictedTo?: string; // e.g., "Strike only", "Move only", "Sustain only"

  /** Frequency limitation */
  frequency?: 'once-per-round' | 'once-per-scene' | 'once-per-session' | 'unlimited';
}
