import { AddDictionaryType, DictionariesVersionsType } from '../../common';
import { store } from '.';

export const INSTALLED_DICTIONARIES_KEY = 'INSTALLED_DICTIONARIES';

export const INITIAL_INSTALLED_DICTIONARIES: DictionariesVersionsType = {};

export const getInstalledDictionaries = () => store.get(INSTALLED_DICTIONARIES_KEY) || INITIAL_INSTALLED_DICTIONARIES;

export const setInstalledDictionary = ({ type, version, replace }: AddDictionaryType) => {
  if (replace) return;

  const prevState = getInstalledDictionaries()[type] || [];
  const newState = [...prevState, version];

  store.set(`${INSTALLED_DICTIONARIES_KEY}.${type}`, newState);
};
