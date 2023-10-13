import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(2.25)};
  `}
`;

export const Support = styled.span``;

export const Link = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['100L']};
  `}
`;

export const Additional = styled.div`
  display: flex;
  justify-content: space-between;
`;
