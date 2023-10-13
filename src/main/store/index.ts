import Store from 'electron-store';

import { StoreType } from '../types';
import { INITIAL_INSTALLED_DICTIONARIES, INSTALLED_DICTIONARIES_KEY } from './dictionaries';
import { INITIAL_WINDOW_OPTIONS, WINDOW_OPTIONS_KEY } from './window-options';

export * from './window-options';
export * from './dictionaries';

const INITIAL_STORE: StoreType = {
  [WINDOW_OPTIONS_KEY]: INITIAL_WINDOW_OPTIONS,
  [INSTALLED_DICTIONARIES_KEY]: INITIAL_INSTALLED_DICTIONARIES
};

export const store = new Store<StoreType>({ defaults: INITIAL_STORE });
