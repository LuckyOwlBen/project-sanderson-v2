import { ActionCostCode } from '../talentEnums/actionCostCode';
import { MovementEffect } from './movementEffect';
import { BonusEffect } from './bonusEffect';
import { ExpertiseGrant } from './expertiseGrant';
import { TalentPrerequisite } from './talentPrereq';
import { TraitGrant } from './traitGrant';
import { AttackDefinition } from './attackDefinition';
import { ActionGrant } from './actionGrant';
import { ResourceTrigger } from './resourceTrigger';
import { ConditionEffect } from './conditionEffect';

export interface TalentNode {
  id: string;
  name: string;
  description: string;
  actionCost: number | ActionCostCode;
  specialActivation?: string; // Description of special activation if actionCost is Special
  prerequisites: TalentPrerequisite[]; // IDs of required talents
  tier: number;
  pathRequirement?: string; // Optional path restriction
  bonuses: BonusEffect[];
  grantsAdvantage?: string[]; // Situations/skills that grant advantage
  grantsDisadvantage?: string[]; // Situations/skills that grant disadvantage
  otherEffects?: string[]; // Descriptions of non-bonus effects (ONLY for truly complex mechanics that can't be structured)

  // Structured data fields - these replace otherEffects wherever possible
  /** Structured expertise grants - replaces text parsing */
  expertiseGrants?: ExpertiseGrant[];

  /** Structured trait grants to items */
  traitGrants?: TraitGrant[];

  /** Structured attack definition for combat talents */
  attackDefinition?: AttackDefinition;

  /** Action economy modifications */
  actionGrants?: ActionGrant[];

  /** Condition application, immunity, or removal */
  conditionEffects?: ConditionEffect[];

  /** Resource triggers and manipulations */
  resourceTriggers?: ResourceTrigger[];

  /** Movement modifications and special movement */
  movementEffects?: MovementEffect[];
}
