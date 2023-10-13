import { CdiscRulesContent } from '@components';
import { CdiscRulesMenuContentConnector } from '@connectors';
import { OptionType, RuleMenuItemType, RulesCountType, RuleSeverityType, RulesGroupType } from '@types';

export const RULES_MENU_ITEMS: RuleMenuItemType[] = [
  {
    id: 'cdisc',
    label: 'CDISC Rules',
    content: <CdiscRulesMenuContentConnector />
  },
  {
    id: 'custom',
    label: 'Custom Rules',
    disabled: true
  },
  {
    id: 'external',
    label: 'Regulatory Rules',
    disabled: true
  },
  {
    id: 'sets',
    label: 'Sets of Rules',
    disabled: true
  }
];

export const RULES_CONTENT: Record<RulesGroupType, JSX.Element> = {
  cdisc: <CdiscRulesContent />,
  custom: <div />,
  external: <div />,
  sets: <div />
};

export const CDISC_RULES_STANDARDS_OPTIONS: OptionType[] = [{ label: 'SDTM', value: 'sdtmig' }];

export const CDISC_RULES_VERSIONS_OPTIONS: OptionType[] = [{ label: '3.4', value: '3-4' }];

export const CDISC_RULES_CT_OPTIONS: OptionType[] = [{ label: 'SDTM CT 2021-06-25', value: 'sdtmct-2021-06-25' }];

export const INIT_RULES_COUNT: RulesCountType = {
  cdisc: 0,
  custom: 0,
  external: 0,
  sets: 0
};

export const RULES_SEVERITY_ORDER: RuleSeverityType[] = ['reject', 'error', 'warning', 'notice'];
