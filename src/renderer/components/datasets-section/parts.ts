import styled, { css } from 'styled-components';

import Backdrop from '@mui/material/Backdrop';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-areas:
      'title'
      'datasets-drop'
      'define-xml'
      'next-step';
    grid-template-rows: repeat(4, max-content);
    grid-template-columns: 1fr;
    gap: ${theme.offset(3)};
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

export const DatasetsContent = styled.div`
  grid-area: datasets-drop;
`;

export const DefineXmlContent = styled.div`
  grid-area: define-xml;
`;

export const NextStep = styled.div`
  grid-area: next-step;
  justify-self: end;
`;

export const Errors = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    color: ${theme.colors.common.danger};
  `}
`;

export const Error = styled.span`
  ${({ theme }) => css`
    margin-top: ${theme.offset(1)};
  `}
`;

export const DatasetsDrop = styled.div<{ $empty: boolean; $error: boolean }>`
  ${({ theme, $empty, $error }) => css`
    position: relative;
    height: 31vh;
    min-height: 217px;
    overflow: hidden;
    border: 1px solid ${$error ? theme.colors.common.danger : theme.colors.neutral['30L']};
    border-radius: ${theme.offset(0.5)};

    ${$empty &&
    `
      border: none;
      background-image: url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill: none; stroke: ${
        $error ? '%23d32f2f' : '%23b2bfc5'
      }; stroke-width: 2; stroke-dasharray: 8 8'/></svg>");
    `}
  `}
`;

export const EmptyMessageWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(2)};
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${theme.colors.neutral['70L']};

    svg {
      min-width: 70px;
      max-width: 7vw;
      min-height: 70px;
      max-height: 12vh;
    }
  `}
`;

export const Message = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;

export const BrowseButton = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['100L']};
    font-weight: 700;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
    background: none;
    border: none;
    cursor: pointer;
  `}
`;

export const LoadingBackdrop = styled(Backdrop)`
  ${({ theme }) => css`
    position: absolute;
    z-index: ${theme.zIndex.drawer + 1};
    color: ${theme.colors.brandColor['100L']};
    background: rgb(242 244 245 / 50%);
  `}
`;
