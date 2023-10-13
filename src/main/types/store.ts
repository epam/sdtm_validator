import { DictionariesVersionsType } from '../../common';
import { INSTALLED_DICTIONARIES_KEY, WINDOW_OPTIONS_KEY } from '../store';

export type WindowOptionsType = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fullscreen: boolean;
  center?: boolean;
};

export type StoreType = {
  [WINDOW_OPTIONS_KEY]: WindowOptionsType;
  [INSTALLED_DICTIONARIES_KEY]: DictionariesVersionsType;
};
