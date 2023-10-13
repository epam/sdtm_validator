/* eslint-disable import/named */
import { Theme } from '@mui/material/styles';
import { CustomThemeType } from '@style';

import 'styled-components';

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface Theme extends CustomThemeType {}
  // eslint-disable-next-line no-unused-vars
  interface ThemeOptions extends CustomThemeType {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
