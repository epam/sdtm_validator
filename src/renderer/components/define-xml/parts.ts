import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-areas:
      'browse content'
      '.      error';
    grid-template-rows: max-content max-content;
    grid-template-columns: max-content 1fr;
    column-gap: ${theme.offset(2)};
  `}
`;

export const Browse = styled.div`
  grid-area: browse;
`;

export const Content = styled.div<{ $disabled: boolean; $error: boolean }>`
  ${({ theme, $disabled, $error }) => css`
    display: flex;
    grid-area: content;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    padding: ${theme.offset(0.75)} ${theme.offset(1)} ${theme.offset(0.75)} ${theme.offset(1.5)};
    border: 1px solid ${theme.colors.neutral['30L']};
    border-radius: ${theme.offset(0.5)};

    ${$disabled && `color: ${theme.colors.neutral['30L']};`}

    ${$error && `border: 1px solid ${theme.colors.common.danger};`}
  `}
`;

export const Path = styled.span`
  display: block;
  min-width: 442px;
  max-width: calc(100vw - 558px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Errors = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: error;
`;

export const Error = styled.span`
  ${({ theme }) => css`
    margin-top: ${theme.offset(1)};
    color: ${theme.colors.common.danger};
  `}
`;
