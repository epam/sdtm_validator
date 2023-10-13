import styled, { css } from 'styled-components';

import MuiCheckbox from '@mui/material/Checkbox';

export const Checkbox = styled(MuiCheckbox)`
  ${({ theme }) => css`
    width: 18px;
    height: 18px;
    padding: 0;
    color: ${theme.colors.neutral['70L']};

    &.Mui-checked {
      color: ${theme.colors.brandColor['100L']};
    }

    &.MuiCheckbox-indeterminate {
      color: ${theme.colors.brandColor['100L']};
    }
  `}
`;
