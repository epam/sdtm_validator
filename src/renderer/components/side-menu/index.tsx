import { useLocation, useNavigate } from 'react-router-dom';

import { ADDITIONAL_ROUTES, ROUTES } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { toggleSideMenuAction } from '@redux';
import { RouteType } from '@types';
import { ChevronLeftIcon, ChevronRightIcon, ComingSoonTooltip, IconButton } from '@ui-kit';

import { Menu, MenuDivider, MenuItemIcon, MenuItemText, MenuItemWrapper, MenuToolbar, MenuWrapper } from './parts';

type MenuItemProps = {
  isActive: boolean;
  label: string;
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
};

const MenuItem = ({ isActive, label, icon, onClick, disabled }: MenuItemProps) => (
  <ComingSoonTooltip hide={!disabled} fullWidth>
    <MenuItemWrapper disabled={disabled} disableRipple onClick={onClick}>
      <MenuItemIcon $active={isActive}>{icon}</MenuItemIcon>
      <MenuItemText $active={isActive} primary={label} disableTypography />
    </MenuItemWrapper>
  </ComingSoonTooltip>
);

export const SideMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isOpen = useAppSelector((state) => state.ui.isOpenSideMenu);

  const toggleSidePanel = () => {
    dispatch(toggleSideMenuAction());
  };

  const onClick = (path: string) => () => {
    navigate(path);
  };

  const renderMenuItems = (menuItems: RouteType[]) =>
    menuItems.map(({ path, ...rest }) => <MenuItem key={path} isActive={pathname === path} onClick={onClick(path)} {...rest} />);

  return (
    <MenuWrapper $open={isOpen} anchor="left" variant="permanent">
      <MenuToolbar>
        <IconButton icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />} onClick={toggleSidePanel} />
      </MenuToolbar>
      <Menu>
        {renderMenuItems(ROUTES)}
        <MenuDivider />
        {renderMenuItems(ADDITIONAL_ROUTES)}
      </Menu>
    </MenuWrapper>
  );
};
