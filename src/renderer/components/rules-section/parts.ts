import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-areas:
      'title      .            .'
      'menu       rules        rules'
      'back-step  dictionaries validate-step';
    grid-template-rows: max-content 1fr max-content;
    grid-template-columns: minmax(173px, 273px) minmax(375px, 1fr) 90px;
    row-gap: ${theme.offset(3)};
    height: 100%;
    padding: ${theme.offset(3)};
    column-gap: ${theme.offset(2)};
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

export const RulesCount = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.offset(3)};
    align-items: center;
    justify-content: flex-end;
    padding: ${theme.offset(2)};
    background: ${theme.colors.neutral['5L']};
  `}
`;

export const RuleCount = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['5D']};
    font-size: ${theme.fontSize.caption};
    line-height: ${theme.lineHeight.caption};
  `}
`;

export const Count = styled.span`
  font-weight: 500;
`;

export const Menu = styled.div`
  grid-area: menu;
`;

export const RulesContent = styled.div`
  grid-area: rules;
`;

export const RulesFrame = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(100% - 48px);
    overflow: hidden;
    border: 1px solid ${theme.colors.neutral['30L']};
    border-radius: ${theme.offset(0.5)};
  `}
`;

export const Toolbar = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.offset(2)} ${theme.offset(2)} ${theme.offset(2.25)};
  `}
`;

export const ValidateStep = styled.div`
  grid-area: validate-step;
  justify-self: end;
`;

export const BackStep = styled.div`
  grid-area: back-step;
`;

export const DictionariesContent = styled.div`
  grid-area: dictionaries;
`;
