import styled, { css } from 'styled-components';

import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

export { Autocomplete, InputAdornment };

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 320px;

    .MuiAutocomplete-listbox {
      padding: ${theme.offset(1.5)} 0;

      .MuiAutocomplete-option {
        padding: ${theme.offset(0.5)} ${theme.offset(1.5)};
        color: ${theme.colors.brandColor['80D']};
        font-size: ${theme.fontSize.body};
        line-height: ${theme.lineHeight.body};

        :hover,
        :focus {
          background: ${theme.colors.neutral['3L']};
        }

        :active {
          background: ${theme.colors.brandColor['30L']};
        }
      }
    }

    .MuiAutocomplete-paper {
      margin-top: ${theme.offset(1.5)};
      border-radius: ${theme.offset(2.5)};
      box-shadow: ${theme.shadow.tooltip};
    }
  `}
`;

export const SearchInput = styled(TextField)`
  ${({ theme }) => css`
    background: ${theme.colors.brandColor['5L']};
    border-radius: ${theme.offset(12.5)};

    .MuiInputAdornment-root {
      color: ${theme.colors.neutral['80L']};
    }

    .MuiAutocomplete-endAdornment {
      top: 2px;

      button {
        color: ${theme.colors.neutral['70L']};

        :hover {
          background: none;
        }
      }
    }

    .MuiOutlinedInput-notchedOutline {
      top: 0;
      border: 1px solid ${theme.colors.brandColor['5L']};
      border-radius: ${theme.offset(12.5)};

      legend {
        display: none;
      }
    }

    .MuiOutlinedInput-root {
      align-items: center;
      height: 36px;
      padding: 0 ${theme.offset(1.25)};
      font-size: ${theme.fontSize.body};
      line-height: ${theme.lineHeight.body};

      .MuiAutocomplete-input {
        padding: 0;

        &::placeholder {
          color: ${theme.colors.neutral['80L']};
          font-size: ${theme.fontSize.body};
          line-height: ${theme.lineHeight.body};
          opacity: 1;
        }

        :focus {
          &::placeholder {
            opacity: 0;
          }
        }
      }
    }

    :hover {
      background: ${theme.colors.brandColor['10L']};

      .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.colors.brandColor['10L']};
      }

      .MuiOutlinedInput-root {
        .MuiAutocomplete-input {
          &::placeholder {
            color: ${theme.colors.neutral['70L']};
          }
        }
      }
    }

    .Mui-focused {
      background: ${theme.colors.common.white};
      border-radius: ${theme.offset(12.5)};

      .MuiInputAdornment-root {
        color: ${theme.colors.brandColor['80D']};
      }

      .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.colors.brandColor['80D']};
      }
    }
  `}
`;
