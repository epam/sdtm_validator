import { DictionaryCommonType } from '@common';

export type DictionaryChipType = DictionaryCommonType & { width?: number };

export type DictionariesChipsType = { displayed: DictionaryChipType[]; hidden: DictionaryChipType[] };

export type DictionariesModalState = 'add' | 'choose' | 'replace' | 'install' | 'error' | 'corrupt';
