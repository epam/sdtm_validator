import { SyntheticEvent } from 'react';

import { RULES_MENU_ITEMS } from '@constants';
import { RuleMenuItemType, RulesGroupType } from '@types';
import { ChevronRightIcon, ComingSoonTooltip } from '@ui-kit';

import { Content, Label, MenuItem, Wrapper } from './parts';

type RuleMenuItemProps = Omit<RuleMenuItemType, 'id'> & {
  expanded: boolean;
  onChange: (_: SyntheticEvent, newExpanded: boolean) => void;
};

const RuleMenuItem = ({ label, content, disabled, expanded, onChange }: RuleMenuItemProps) => (
  <MenuItem disabled={disabled} expanded={expanded} onChange={onChange}>
    <ComingSoonTooltip hide={!disabled} fullWidth>
      <Label expandIcon={<ChevronRightIcon />}>{label}</Label>
    </ComingSoonTooltip>
    <Content>{content}</Content>
  </MenuItem>
);

type RulesMenuProps = {
  expandedMenu: RulesGroupType | false;
  handleChange: (id: RulesGroupType) => (_: SyntheticEvent, newExpanded: boolean) => void;
};

export const RulesMenu = ({ expandedMenu, handleChange }: RulesMenuProps) => {
  const renderMenuItems = (menuItems: RuleMenuItemType[]) =>
    menuItems.map(({ id, ...rest }) => <RuleMenuItem key={id} expanded={expandedMenu === id} onChange={handleChange(id)} {...rest} />);

  return <Wrapper>{renderMenuItems(RULES_MENU_ITEMS)}</Wrapper>;
};
