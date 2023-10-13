import styled, { css } from 'styled-components';

import Divider from '@mui/material/Divider';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(2)};
    align-items: flex-end;
    padding: ${theme.offset(3)} ${theme.offset(2)} ${theme.offset(2)};
  `}
`;

export const Group = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(3)};
    width: 100%;
  `}
`;

export const GroupDivider = styled(Divider)`
  ${({ theme }) => css`
    border-color: ${theme.colors.neutral['15L']};
  `}
`;
