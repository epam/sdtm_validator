import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 400px;
    color: ${theme.colors.neutral['70L']};
    text-align: center;
    overflow-wrap: break-word;
  `}
`;

export const SearchRequest = styled.span`
  font-weight: 600;
`;
