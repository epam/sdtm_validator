import { DictionaryType } from '../../common';
import { APP_DATA_PATH } from '..';
import { DICTIONARIES_DIRECTORY } from '../constants';
import { getPath } from './get-path';

export const getDictionaryPath = (type: DictionaryType, version: string): string =>
  getPath(APP_DATA_PATH, DICTIONARIES_DIRECTORY, type, version);

export const getTotalDictionarySize = (dictionaryFilesSizes: number[]): number =>
  dictionaryFilesSizes.reduce((acc, size) => {
    acc += size;

    return acc;
  }, 0);
