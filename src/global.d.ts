// Type definitions for Daggerheart API global types

declare type Source = {
  id: string;
  set: string;
  publisher: string;
  updated: string;
};

declare type SubclassTraitOption = {
  type: string;
  option?: string;
  description?: string;
};

declare type SubclassTrait = {
  trait?: string;
  description?: string;
  type?: string;
  frequency?: string;
  options?: SubclassTraitOption[];
};

declare type SubclassLevel = {
  level: string;
  traits: SubclassTrait[];
  tags?: string[];
  source: Source;
};

declare type SubclassLevels = {
  foundation: SubclassLevel;
  specialization: SubclassLevel;
  mastery: SubclassLevel;
};

declare type Subclass = {
  id: string;
  type: string;
  classId: string;
  name: string;
  description?: string;
  spellcastTrait?: string;
  levels: SubclassLevels;
  source: Source;
};

declare type CharacterClass = {
  id: string;
  type: string;
  name: string;
  description?: string;
  subclassOptions?: Subclass[];
  source: Source;
};
