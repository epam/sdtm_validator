import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    user-select: none;
  }

  main {
    ${({ theme }) => css`
      color: ${theme.colors.brandColor['5D']};
      font-weight: 400;
      font-size: ${theme.fontSize.body};
      font-family: Roboto, sans-serif;
      line-height: ${theme.lineHeight.body};
      letter-spacing: 0.13px;
      cursor: default;
    `}
  }
`;
