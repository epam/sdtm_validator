import { DictionaryType } from '../../common';

export const DICTIONARIES_DIRECTORY = 'Dictionaries';

const MEDDRA_SCHEMA = ['pt.asc', 'soc.asc', 'soc_hlgt.asc', 'llt.asc', 'hlt.asc', 'hlt_pt.asc', 'hlgt.asc', 'hlgt_hlt.asc'];

const WHODRUG_SCHEMA = ['dd.txt', 'dda.txt', 'ina.txt'];

export const DICTIONARY_SCHEMAS: Record<DictionaryType, string[]> = {
  meddra: MEDDRA_SCHEMA,
  whodrug: WHODRUG_SCHEMA
};
