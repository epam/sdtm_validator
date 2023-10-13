import styled, { css } from 'styled-components';

import MuiButton from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Spinner } from '@ui-kit';

const Button = styled(MuiButton)`
  ${({ theme }) => css`
    flex-shrink: 0;
    width: max-content;
    height: 36px;
    padding: ${theme.offset(0.75)} ${theme.offset(2)};
    font-weight: 500;
    font-size: ${theme.fontSize.h3};
    line-height: ${theme.lineHeight.h3};
    text-transform: none;
    border-radius: ${theme.offset(12.5)};

    .MuiButton-endIcon,
    .MuiButton-startIcon {
      margin: 0;
    }
  `}
`;

export const StyledOutlinedButton = styled(Button)`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['100L']};
    background: ${theme.colors.common.white};
    border: 1px solid ${theme.colors.brandColor['60L']};

    :hover,
    :focus {
      background: ${theme.colors.brandColor['3L']};
      border: 1px solid ${theme.colors.brandColor['100L']};
    }

    :active {
      background: ${theme.colors.brandColor['15L']};
      border: 1px solid ${theme.colors.brandColor['100L']};
    }

    :disabled {
      color: ${theme.colors.neutral['60L']};
      background: ${theme.colors.neutral['15L']};
      border: 1px solid ${theme.colors.neutral['15L']};
    }
  `}
`;

export const StyledPrimaryButton = styled(Button)`
  ${({ theme }) => css`
    color: ${theme.colors.common.white};
    background: ${theme.colors.brandColor['100L']};
    border: 1px solid ${theme.colors.brandColor['100L']};

    :hover,
    :focus {
      background: ${theme.colors.brandColor['80D']};
      border: 1px solid ${theme.colors.brandColor['80D']};
    }

    :active {
      background: ${theme.colors.brandColor['60L']};
      border: 1px solid ${theme.colors.brandColor['60L']};
    }

    :disabled {
      color: ${theme.colors.neutral['60L']};
      background: ${theme.colors.neutral['15L']};
      border: 1px solid ${theme.colors.neutral['15L']};
    }
  `}
`;

export const StyledTextButton = styled(Button)`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['100L']};
    border: 1px solid transparent;

    :hover,
    :focus {
      background: ${theme.colors.brandColor['3L']};
      border: 1px solid ${theme.colors.brandColor['3L']};
    }

    :active {
      background: ${theme.colors.brandColor['15L']};
      border: 1px solid ${theme.colors.brandColor['15L']};
    }

    :disabled {
      color: ${theme.colors.neutral['30L']};
      border: 1px solid transparent;
    }
  `}
`;

export const StyledLinkButton = styled(Button)`
  ${({ theme }) => css`
    min-height: 0;
    padding: 0;
    color: ${theme.colors.brandColor['100L']};
    font-weight: 400;
    text-decoration: underline;

    :hover,
    :focus {
      text-decoration: underline;
      background: none;
    }

    :active {
      background: none;
    }

    :disabled {
      color: ${theme.colors.neutral['30L']};
    }
  `}
`;

export const StyledIconButton = styled(IconButton)`
  ${({ theme }) => css`
    padding: 0;
    color: ${theme.colors.neutral['70L']};

    :hover {
      background: none;
    }
  `}
`;

export const Loading = styled(Spinner)`
  ${({ theme }) => css`
    margin-right: ${theme.offset(0.75)};
    margin-left: ${theme.offset(0.5)};
    color: ${theme.colors.neutral['30L']};
  `}
`;
