import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(3)};
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 215px;
    max-height: calc(100vh - 485px);
  `}
`;
