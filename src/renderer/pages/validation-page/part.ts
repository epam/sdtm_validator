import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-areas:
      'title'
      'stepper'
      'content';
    grid-template-rows: max-content max-content 1fr;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
    padding: ${theme.offset(3)} ${theme.offset(2)} ${theme.offset(4)};
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    grid-area: title;
    color: ${theme.colors.brandColor['60D']};
    font-weight: 500;
    font-size: ${theme.fontSize.h1};
    line-height: ${theme.lineHeight.h1};
  `}
`;

export const Stepper = styled.div`
  ${({ theme }) => css`
    grid-area: stepper;
    width: 70%;
    min-width: 700px;
    padding: ${theme.offset(2)} 0 ${theme.offset(4)};
  `}
`;

export const Content = styled.div`
  grid-area: content;
`;
