import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: max-content;
  min-width: 283px;
  max-width: 400px;
`;

export const Toolbar = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    margin-top: ${theme.offset(2)};
  `}
`;

export const ErrorTitle = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.common.danger};
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;

export const CorruptWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(2)};
    max-width: 283px;
    padding: ${theme.offset(1)} 0;
    text-align: center;
  `}
`;

export const ReplaceWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(2)};
    padding: ${theme.offset(1)} 0;
    text-align: center;
  `}
`;

export const ReplaceTitle = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['5D']};
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.neutral['70L']};
    font-size: ${theme.fontSize.body};
    line-height: ${theme.lineHeight.body};
    white-space: pre-line;
  `}
`;

export const DictionaryLabel = styled.span`
  font-weight: 500;
  white-space: nowrap;
`;

export const AddWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(2.25)};
  `}
`;

export const AddTitle = styled.h4`
  ${({ theme }) => css`
    margin-top: ${theme.offset(2.25)};
    color: ${theme.colors.brandColor['5D']};
    font-weight: 500;
    font-size: ${theme.fontSize.body};
    line-height: ${theme.lineHeight.body};
  `}
`;

export const ChooseWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(3)};
    padding-top: ${theme.offset(3)};
  `}
`;

export const InstallWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(4)};
    align-items: center;
    justify-content: center;
    padding: ${theme.offset(7)} 0 ${theme.offset(9)};
  `}
`;

export const InstallMessage = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['5D']};
    font-size: ${theme.fontSize.body};
    line-height: ${theme.lineHeight.body};
  `}
`;
