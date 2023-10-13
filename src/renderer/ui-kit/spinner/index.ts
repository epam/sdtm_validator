import styled, { css } from 'styled-components';

import CircularProgress from '@mui/material/CircularProgress';

export const Spinner = styled(CircularProgress)`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['100L']};
  `}
`;
