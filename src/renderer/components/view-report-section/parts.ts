import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: grid;
    grid-template-areas:
      'title'
      'content';
    grid-template-rows: repeat(2, max-content);
    grid-template-columns: 1fr;
    height: 100%;
    padding: ${theme.offset(3)};
    border-radius: ${theme.offset(2.5)};
    box-shadow: ${theme.shadow.cards};
  `}
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    grid-area: title;
    color: ${theme.colors.brandColor['5D']};
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    grid-area: content;
    gap: ${theme.offset(2.25)};
    align-items: center;
    margin-top: 8%;
    place-self: center;
  `}
`;

export const ReportDetailsTitle = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['100L']};
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
    text-align: center;
    text-transform: uppercase;
  `}
`;

export const ReportDetailsWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-auto-rows: max-content;
    grid-auto-flow: row;
    grid-template-columns: max-content max-content;
    padding-bottom: ${theme.offset(2)};
    column-gap: ${theme.offset(2)};
    row-gap: ${theme.offset(1.5)};
  `}
`;

export const Label = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.neutral['60L']};
  `}
`;

export const Value = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['5D']};
    font-weight: 500;
  `}
`;

export const Toolbar = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(2)};
    align-items: center;
  `}
`;

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(3)};
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `}
`;

export const ErrorWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(2)};
    width: 260px;
    padding: ${theme.offset(2.25)} ${theme.offset(4.25)};
    color: ${theme.colors.neutral['60L']};
    text-align: center;
    border: 1px solid ${theme.colors.neutral['30L']};
    border-radius: ${theme.offset(0.5)};
  `}
`;

export const ErrorTitle = styled.h3`
  ${({ theme }) => css`
    font-weight: 400;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;

export const ErrorText = styled.p``;
