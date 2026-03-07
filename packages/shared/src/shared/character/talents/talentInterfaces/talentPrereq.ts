export interface TalentPrerequisite {
  type: 'talent' | 'skill' | 'attribute' | 'level' | 'ideal';
  target: string; // talent ID, skill name, attribute name, 'character', or ideal level ('first', 'second', etc.)
  value?: number; // For skill ranks, attribute values, level, or ideal level (1-5)
  operator?: 'AND' | 'OR'; // Default is And
}
