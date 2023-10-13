import { WindowOptionsType } from '../types';
import { store } from '.';

export const WINDOW_OPTIONS_KEY = 'WINDOW_OPTIONS';

export const INITIAL_WINDOW_OPTIONS: WindowOptionsType = {
  fullscreen: false
};

export const getSavedWindowOptions = () => store.get(WINDOW_OPTIONS_KEY) || INITIAL_WINDOW_OPTIONS;

export const saveWindowOptions = (windowOptions: WindowOptionsType) => {
  store.set(WINDOW_OPTIONS_KEY, windowOptions);
};
