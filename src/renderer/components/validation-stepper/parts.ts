import styled, { css } from 'styled-components';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

export const Wrapper = styled(Stepper)`
  width: 100%;
`;

export const StepItem = styled(Step)`
  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
  }
`;

export const Label = styled(StepLabel)`
  ${({ theme }) => css`
    .MuiStepIcon-text {
      font-size: ${theme.fontSize.h3};
      line-height: ${theme.fontSize.h3};
    }

    .Mui-disabled {
      color: ${theme.colors.neutral['60L']};

      .MuiStepIcon-root {
        color: ${theme.colors.neutral['40L']};
      }
    }

    .Mui-active,
    .Mui-completed {
      color: ${theme.colors.brandColor['5D']};

      .MuiStepIcon-root {
        color: ${theme.colors.brandColor['100L']};
      }
    }
  `}
`;
