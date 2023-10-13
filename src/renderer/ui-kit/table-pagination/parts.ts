import styled, { css } from 'styled-components';

import Select from '@mui/material/Select';
import { theme } from '@style';

export const MenuProps = {
  PaperProps: {
    style: {
      boxShadow: theme.shadow.tooltip,
      padding: `${theme.offset(0.5)} 0`
    }
  }
};

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.offset(2)};
    align-items: center;
    justify-content: flex-end;
    padding: ${theme.offset(0.5)} ${theme.offset(2)};
    border-top: 1px solid ${theme.colors.neutral['15L']};
  `}
`;

export const RowsPerPageSelect = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.offset(0.5)};
    align-items: center;
  `}
`;

export const Label = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['5D']};
    font-size: ${theme.fontSize.hint};
    line-height: ${theme.fontSize.hint};
  `}
`;

export const Input = styled(Select)`
  ${({ theme }) => css`
    .MuiOutlinedInput-input {
      min-width: 16px;
      min-height: 0;
      padding: 0;
      padding: ${theme.offset(0.5)} ${theme.offset(3)} ${theme.offset(0.5)} ${theme.offset(1)} !important;
      color: ${theme.colors.brandColor['5D']};
      font-size: ${theme.fontSize.body};
      line-height: ${theme.fontSize.body};
      text-align: right;
      border: none;
    }

    .MuiSelect-icon {
      top: -2px;
      right: 0;
      color: ${theme.colors.neutral['70L']};
    }

    .MuiOutlinedInput-notchedOutline {
      border: none;
    }

    :hover {
      .MuiOutlinedInput-notchedOutline {
        border: none;
      }
    }

    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border: none;
      }
    }
  `}
`;

export const FromTo = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['5D']};
    font-size: ${theme.fontSize.hint};
    line-height: ${theme.fontSize.hint};
  `}
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
`;
