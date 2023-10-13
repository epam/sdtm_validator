import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 232px;
`;

export const ErrorWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(2)};
    align-items: flex-end;
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    align-self: center;
    color: ${theme.colors.common.danger};
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    width: 100%;
    margin-bottom: ${theme.offset(2)};
    color: ${theme.colors.neutral['70L']};
    font-size: ${theme.fontSize.body};
    line-height: ${theme.lineHeight.body};
    white-space: pre-line;
    text-align: center;
  `}
`;

export const Link = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['100L']};
    text-decoration: none;
  `}
`;
