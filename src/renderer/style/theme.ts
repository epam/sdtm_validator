import { createTheme } from '@mui/material';

const defaultOffset = 8;

const fontSize = {
  h1: '24px',
  h2: '16px',
  h3: '14px',
  body: '14px',
  caption: '13px',
  hint: '12px'
};

const lineHeight = {
  h1: '32px',
  h2: '22px',
  h3: '20px',
  body: '20px',
  caption: '16px',
  hint: '16px'
};

const colors = {
  brandColor: {
    '100L': '#008ace',
    '80L': '#33a1d8',
    '60L': '#66b9e2',
    '40L': '#99d0eb',
    '30L': '#b2dcf0',
    '25L': '#bfe2f3',
    '20L': '#cce8f5',
    '15L': '#d9eef8',
    '10L': '#e5f3fa',
    '5L': '#f2f9fd',
    '3L': '#f7fbfd',
    '80D': '#006ea5',
    '60D': '#00537c',
    '30D': '#002a3e',
    '20D': '#001c29',
    '5D': '#00070b'
  },
  neutral: {
    '100L': '#002a3e',
    '80L': '#335565',
    '70L': '#4c6978',
    '60L': '#667f8b',
    '50L': '#80959f',
    '40L': '#99aab2',
    '30L': '#b2bfc5',
    '25L': '#bfcacf',
    '20L': '#ccd4d8',
    '15L': '#d9dfe2',
    '10L': '#e5e9eb',
    '5L': '#f2f4f5',
    '3L': '#f7f8f9'
  },
  common: {
    white: '#ffffff',
    danger: '#d32f2f',
    warning: '#deb831'
  }
};

const shadow = {
  cards: '0 1px 6px 0 #0000001a, 0 8px 16px 0 #0000001f',
  dialog: '0 1px 10px 0 #0000001a, 0 16px 24px 0 #0000001f',
  tooltip: '0 1px 6px 0 #0000001a, 0 4px 10px 0 #0000001f'
};

const ruleSeverityChips = {
  warning: {
    background: '#f8f1d6',
    color: '#b29327'
  },
  error: {
    background: '#f6d5d5',
    color: '#a92626'
  },
  notice: {
    background: '#cce0eb',
    color: '#00527a'
  },
  reject: {
    background: '#dfcccc',
    color: '#3a0000'
  }
};

const customTheme = {
  offset: (n: number) => `${n * defaultOffset}px`,
  fontSize,
  lineHeight,
  colors,
  shadow,
  ruleSeverityChips
};

export const theme = createTheme(customTheme);
export type CustomThemeType = typeof customTheme;
