import styled, { css } from 'styled-components';

import Dialog from '@mui/material/Dialog';

export const Wrapper = styled(Dialog)`
  ${({ theme }) => css`
    .MuiDialog-paper {
      padding: ${theme.offset(3)};
      font-family: Roboto, sans-serif;
      border-radius: ${theme.offset(2.5)};
      box-shadow: ${({ theme }) => theme.shadow.dialog};
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['5D']};
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;
