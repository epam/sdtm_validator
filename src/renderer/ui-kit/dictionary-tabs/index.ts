import styled, { css } from 'styled-components';

import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';

export const DictionaryTabs = styled(MuiTabs)`
  ${({ theme }) => css`
    min-height: 38px;

    .MuiTabs-indicator {
      background: none;
    }

    .MuiTabs-scrollButtons {
      color: ${theme.colors.neutral['80L']};

      &.Mui-disabled {
        color: ${theme.colors.neutral['30L']};
        opacity: 1;
      }
    }
  `}
`;

export const DictionaryTab = styled(MuiTab)`
  ${({ theme }) => css`
    min-width: max-content;
    min-height: 0;
    padding: ${theme.offset(1)} ${theme.offset(1.5)};
    color: ${theme.colors.brandColor['5D']};
    font-size: ${theme.fontSize.body};
    line-height: ${theme.lineHeight.body};
    text-transform: capitalize;
    border: 1px solid ${theme.colors.neutral['30L']};

    :hover {
      color: ${theme.colors.brandColor['5D']};
      background: none;
      border: 1px solid ${theme.colors.neutral['80L']};
    }

    :active {
      color: ${theme.colors.brandColor['100L']};
      background: ${theme.colors.brandColor['15L']};
      border: 1px solid ${theme.colors.brandColor['100L']};
    }

    &.Mui-selected {
      color: ${theme.colors.brandColor['100L']};
      background: ${theme.colors.brandColor['3L']};
      border: 1px solid ${theme.colors.brandColor['100L']};
    }

    &.Mui-disabled {
      color: ${theme.colors.neutral['60L']};
      background: ${theme.colors.neutral['15L']};
      border: 1px solid ${theme.colors.neutral['15L']};
    }
  `}
`;
