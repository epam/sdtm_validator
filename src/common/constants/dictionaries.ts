import { DictionaryType } from '../types';

export const DICTIONARY_LABELS: Record<DictionaryType, string> = {
  meddra: 'MedDRA',
  whodrug: 'WHODD (B3)'
};

const MEDDRA_MAX_SIZE = 1024 * 1024 * 50;

const WHODRUG_MAX_SIZE = 1024 * 1024 * 1024;

const MEDDRA_MAX_FILES = 50;

const WHODRUG_MAX_FILES = 50;

export const DICTIONARY_MAX_SIZE: Record<DictionaryType, number> = {
  meddra: MEDDRA_MAX_SIZE,
  whodrug: WHODRUG_MAX_SIZE
};

export const DICTIONARY_MAX_FILES: Record<DictionaryType, number> = {
  meddra: MEDDRA_MAX_FILES,
  whodrug: WHODRUG_MAX_FILES
};
