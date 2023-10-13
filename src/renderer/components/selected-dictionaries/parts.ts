import styled, { css } from 'styled-components';

import { MenuListProps, PaperProps } from '@mui/material';
import Menu from '@mui/material/Menu';
import { theme } from '@style';

export { Menu };

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.offset(1)};
    align-items: center;
    overflow: hidden;
  `}
`;

export const PopupButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.offset(0.5)} ${theme.offset(1.5)};
    color: ${theme.colors.brandColor['80D']};
    font-weight: 500;
    font-size: ${theme.fontSize.body};
    font-family: inherit;
    line-height: ${theme.lineHeight.body};
    background: ${theme.colors.brandColor['15L']};
    border: none;
    border-radius: ${theme.offset(2)};
    cursor: pointer;

    :hover,
    :active,
    :focus {
      background: ${theme.colors.brandColor['40L']};
    }
  `}
`;

export const PaperStyle: PaperProps = {
  style: {
    boxShadow: theme.shadow.tooltip,
    padding: `${theme.offset(1.5)} ${theme.offset(2.5)}`,
    marginTop: `-${theme.offset(1.5)}`,
    borderRadius: theme.offset(2.5),
    minWidth: '230px'
  }
};

export const MenuListStyle: MenuListProps = {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.offset(1.5)
  }
};
