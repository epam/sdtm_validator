import styled, { css } from 'styled-components';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiMenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export { FormControl };

export const Label = styled(InputLabel)`
  ${({ theme }) => css`
    top: -5px;
    padding-right: ${theme.offset(2.5)};
    color: ${theme.colors.neutral['80L']};
    font-size: ${theme.fontSize.body};
    line-height: ${theme.lineHeight.body};

    &.MuiInputLabel-shrink {
      top: 2px;
    }

    &.Mui-focused {
      top: 2px;
      color: ${theme.colors.brandColor['100L']};
    }

    &.Mui-error {
      color: ${theme.colors.common.danger};
    }

    &.Mui-disabled {
      color: ${theme.colors.neutral['30L']};
    }
  `}
`;

export const Required = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.common.danger};
  `}
`;

export const Input = styled(Select)`
  ${({ theme }) => css`
    .MuiOutlinedInput-input {
      height: 0;
      min-height: 20px;
      padding: ${theme.offset(1.5)} ${theme.offset(4)} ${theme.offset(1.5)} ${theme.offset(1.5)};
      color: ${theme.colors.brandColor['5D']};
      font-size: ${theme.fontSize.body};
      line-height: ${theme.lineHeight.body};
    }

    .MuiSelect-icon {
      color: ${theme.colors.neutral['70L']};
    }

    .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${theme.colors.neutral['30L']};

      legend {
        padding-inline-start: 0;
        padding-inline-end: 0;

        span {
          min-width: 45px;
          padding: 0;
          font-size: ${theme.fontSize.hint};
          line-height: ${theme.lineHeight.hint};
        }
      }
    }

    :hover {
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.colors.neutral['80L']};
      }
    }

    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.colors.brandColor['100L']};
      }
    }

    &.Mui-error {
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.colors.common.danger};
      }
    }

    &.Mui-disabled {
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.colors.neutral['30L']};
      }

      .MuiSelect-icon {
        color: ${theme.colors.neutral['30L']};
      }
    }
  `}
`;

export const Option = styled(MuiMenuItem)`
  ${({ theme }) => css`
    padding: ${theme.offset(1)} ${theme.offset(2)};
    color: ${theme.colors.brandColor['5D']};
    font-size: ${theme.fontSize.body};
    line-height: ${theme.lineHeight.body};

    :hover,
    :focus {
      background: ${theme.colors.neutral['3L']};
    }

    :active {
      background: ${theme.colors.brandColor['30L']};
    }

    &.Mui-selected {
      background: ${theme.colors.brandColor['5L']};

      :hover,
      :focus {
        background: ${theme.colors.brandColor['15L']};
      }

      :active {
        background: ${theme.colors.brandColor['30L']};
      }
    }
  `}
`;

export const Error = styled.span`
  ${({ theme }) => css`
    padding: ${theme.offset(0.25)};
    color: ${theme.colors.common.danger};
    font-size: ${theme.fontSize.hint};
    line-height: ${theme.lineHeight.hint};
  `}
`;
