import styled, { css } from 'styled-components';

import { RuleSeverityType } from '@types';

export const Wrapper = styled.div<{ $severity: RuleSeverityType }>`
  ${({ theme, $severity }) => css`
    width: max-content;
    padding: 0 ${theme.offset(1)};
    color: ${theme.ruleSeverityChips[$severity].color};
    font-weight: 500;
    text-transform: capitalize;
    background: ${theme.ruleSeverityChips[$severity].background};
    border-radius: ${theme.offset(12.5)};
  `}
`;
