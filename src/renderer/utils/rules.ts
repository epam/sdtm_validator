import { RULES_SEVERITY_ORDER, RULES_TABLE_IDS } from '@constants';
import { RuleKeyType, RuleType } from '@types';

export const getFormattedCdiscRules = (cdiscRules: any): RuleType[] =>
  cdiscRules.map(({ coreId: id, severity, description }: any) => ({ id, severity, description }));

export const sortRulesBy =
  (sortBy?: RuleKeyType) =>
  (rule: RuleType): string | number => {
    if (sortBy === RULES_TABLE_IDS.severity || !sortBy) {
      return RULES_SEVERITY_ORDER.indexOf(rule.severity);
    }

    return rule[sortBy];
  };

export const getTotalRulesCount = <T>(...rules: T[][]) =>
  rules.reduce((acc, rules) => {
    acc += rules.length;

    return acc;
  }, 0);
