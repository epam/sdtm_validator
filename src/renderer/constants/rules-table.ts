import { RuleKeyType, TableHeaderType } from '@types';

export const RULES_TABLE_IDS: Record<RuleKeyType, RuleKeyType> = {
  id: 'id',
  description: 'description',
  severity: 'severity'
};

export const RULES_TABLE_LABELS: Record<RuleKeyType, string> = {
  id: 'Rule ID',
  description: 'Description',
  severity: 'Rule Severity'
};

export const RULES_TABLE_HEADERS: TableHeaderType[] = [
  { id: RULES_TABLE_IDS.id, label: RULES_TABLE_LABELS.id, minWidth: '181px', width: '25%' },
  { id: RULES_TABLE_IDS.description, label: RULES_TABLE_LABELS.description, minWidth: '126px', width: '75%' },
  { id: RULES_TABLE_IDS.severity, label: RULES_TABLE_LABELS.severity, minWidth: '126px', width: '0%' }
];
