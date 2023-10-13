import { SyntheticEvent } from 'react';

import { RULES_MENU_ITEMS } from '@constants';
import { useAppSelector } from '@hooks';
import { RulesGroupType } from '@types';
import { ComingSoonTooltip, Tab, Tabs } from '@ui-kit';

type RulesTabsProps = {
  activeTab: RulesGroupType;
  handleChange: (_: SyntheticEvent, id: RulesGroupType) => void;
};

export const RulesTabs = ({ activeTab, handleChange }: RulesTabsProps) => {
  const rulesCount = useAppSelector((state) => state.rules.rulesCount);

  return (
    <Tabs value={activeTab} variant="scrollable" onChange={handleChange}>
      {RULES_MENU_ITEMS.map(({ label, id, disabled }) => (
        <Tab
          key={id}
          disabled={disabled}
          label={<ComingSoonTooltip hide={!disabled}>{`${label} (${rulesCount[id]})`}</ComingSoonTooltip>}
          value={id}
          disableRipple
        />
      ))}
    </Tabs>
  );
};
