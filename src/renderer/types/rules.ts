export type RulesGroupType = 'cdisc' | 'custom' | 'external' | 'sets';

export type RuleSeverityType = 'error' | 'warning' | 'notice' | 'reject';

export type RuleMenuItemType = {
  id: RulesGroupType;
  label: string;
  content?: JSX.Element;
  disabled?: boolean;
};

export type RulesCountType = Record<RulesGroupType, number>;

export type RuleType = {
  id: string;
  severity: RuleSeverityType;
  description: string;
};

export type RuleKeyType = keyof RuleType;
