import styled, { css } from 'styled-components';

import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';

export const Tabs = styled(MuiTabs)`
  ${({ theme }) => css`
    .MuiTabs-indicator {
      background: ${theme.colors.brandColor['100L']};
    }

    .MuiTabs-scrollButtons {
      display: flex;
      color: ${theme.colors.neutral['80L']};

      &.Mui-disabled {
        color: ${theme.colors.neutral['30L']};
        opacity: 1;
      }
    }
  `}
`;

export const Tab = styled(MuiTab)`
  ${({ theme }) => css`
    color: ${theme.colors.neutral['80L']};
    text-transform: capitalize;

    :active {
      color: ${theme.colors.brandColor['100L']};
      background: ${theme.colors.brandColor['15L']};
    }

    &.Mui-selected {
      color: ${theme.colors.brandColor['100L']};
    }

    &.Mui-disabled {
      color: ${theme.colors.neutral['30L']};
      background: none;
      pointer-events: auto;
    }
  `}
`;
