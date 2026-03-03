import { TalentNode } from './talentNode';
import { TalentTree } from './talentTree';

export interface TalentPath {
  name: string;
  paths: TalentTree[];
  tierZeroTalent: TalentNode; // For talent nodes not in a specific tree
}
