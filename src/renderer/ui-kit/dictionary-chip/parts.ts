import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.offset(0.5)};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: ${theme.offset(0.5)} ${theme.offset(1.5)};
    color: ${theme.colors.brandColor['80D']};
    font-size: ${theme.fontSize.body};
    font-family: Roboto, sans-serif;
    line-height: ${theme.lineHeight.body};
    background: ${theme.colors.brandColor['15L']};
    border-radius: ${theme.offset(2)};
  `}
`;

export const Title = styled.span`
  font-weight: 500;
  white-space: nowrap;
`;

export const Version = styled.span`
  font-weight: 400;
`;

export const RemoveButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    color: ${theme.colors.brandColor['100L']};
    border: none;
    border-radius: 50%;
    cursor: pointer;

    :hover,
    :active,
    :focus {
      color: ${theme.colors.brandColor['80D']};
    }
  `}
`;
