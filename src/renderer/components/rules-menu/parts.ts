import styled, { css } from 'styled-components';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export const Wrapper = styled.div`
  height: 100%;
  min-height: 386px;
  max-height: calc(100vh - 317px);
  overflow-y: auto;
`;

export const MenuItem = styled(Accordion)`
  ${({ theme }) => css`
    overflow: hidden;
    border: 1px solid ${theme.colors.neutral['30L']};
    border-bottom: none;
    box-shadow: none;

    :last-child {
      border-bottom: 1px solid ${theme.colors.neutral['30L']};
    }

    &.Mui-expanded {
      margin: 0;
    }
  `}
`;

export const Label = styled(AccordionSummary)`
  ${({ theme }) => css`
    flex-direction: row-reverse;
    padding: ${theme.offset(1.5)};
    color: ${theme.colors.neutral['70L']};
    font-weight: 500;
    background: ${theme.colors.neutral['3L']};

    &.Mui-expanded {
      min-height: 0;
    }

    .MuiAccordionSummary-expandIconWrapper {
      color: ${theme.colors.neutral['70L']};
    }

    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
      transform: rotate(90deg);
    }

    .MuiAccordionSummary-content {
      margin: 0;
      margin-left: ${theme.offset(0.5)};
    }

    &.Mui-disabled {
      color: ${theme.colors.neutral['60L']};
      background: ${theme.colors.neutral['15L']};
      opacity: 1;

      .MuiAccordionSummary-expandIconWrapper {
        color: ${theme.colors.neutral['60L']};
      }
    }
  `}
`;

export const Content = styled(AccordionDetails)`
  ${({ theme }) => css`
    padding: 0;
    border-top: 1px solid ${theme.colors.neutral['30L']};
  `}
`;
