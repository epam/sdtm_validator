import styled from 'styled-components';

import MuiTooltip from '@mui/material/Tooltip';

export { MuiTooltip };

export const TooltipLabel = styled.span<{ $fullWidth?: boolean }>`
  display: inline-block;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'max-content')};
  max-width: 100%;
  vertical-align: middle;
`;
