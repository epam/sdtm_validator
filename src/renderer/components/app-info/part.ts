import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(1)};
    align-items: center;
  `}
`;

export const Name = styled.span`
  ${({ theme }) => css`
    min-height: ${theme.fontSize.h1};
    color: ${theme.colors.brandColor['100L']};
    font-weight: 500;
    font-size: ${theme.fontSize.h1};
    line-height: ${theme.fontSize.h1};
    text-transform: uppercase;
  `}
`;

export const Version = styled.span``;
