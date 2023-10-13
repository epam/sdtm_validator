import styled, { css } from 'styled-components';

export const Wrapper = styled.div.attrs(({ ref }: { ref: React.MutableRefObject<HTMLDivElement | undefined> }) => ({
  ref: ref
}))`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.offset(1.5)};
    align-items: center;
  `}
`;
