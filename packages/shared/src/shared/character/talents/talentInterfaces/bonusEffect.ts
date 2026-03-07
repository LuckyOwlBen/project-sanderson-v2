import { BonusType } from '../talentEnums/bonusType';

export interface BonusEffect {
  type: BonusType;
  target: string; // e.g., 'strength', 'athletics', 'parry'
  value?: number;
  formula?: string; // e.g., '1 + tier', 'perception.ranks', 'athletics.ranks / 2'
  scaling?: boolean;
  condition?: string;
}
