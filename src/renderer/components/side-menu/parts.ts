import styled, { css } from 'styled-components';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export const MenuWrapper = styled(Drawer)<{ $open: boolean }>`
  ${({ theme, $open }) => css`
    height: 100%;

    .MuiPaper-root {
      position: relative;
      width: ${$open ? '250px' : '74px'};
      overflow-x: hidden;
      background: ${theme.colors.brandColor['3L']};
      border: 1px solid ${theme.colors.brandColor['15L']};
      transition: 0.3s ease;
    }
  `}
`;

export const MenuToolbar = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    width: 72px;
    height: 56px;
    padding: ${theme.offset(1)} ${theme.offset(2)} 0;
  `}
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuItemWrapper = styled(ListItemButton)`
  ${({ theme }) => css`
    height: 56px;
    padding: 0 ${theme.offset(3)};

    :hover {
      background: ${theme.colors.brandColor['15L']};
    }
  `}
`;

export const MenuItemIcon = styled(ListItemIcon)<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    min-width: 0;
    margin-right: ${theme.offset(3)};
    color: ${$active ? theme.colors.brandColor['100L'] : theme.colors.neutral['70L']};
  `}
`;

export const MenuItemText = styled(ListItemText)<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    color: ${$active ? theme.colors.brandColor['100L'] : theme.colors.neutral['60L']};
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
    white-space: nowrap;
  `}
`;

export const MenuDivider = styled(Divider)`
  ${({ theme }) => css`
    border-color: ${theme.colors.brandColor['15L']};
  `}
`;
