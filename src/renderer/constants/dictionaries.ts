import { DictionaryType } from '@common';
import { DictionariesModalState, OptionType } from '@types';

export const NOT_SELECTED_DICTIONARY = 'none';

export const BROWSE_BUTTON_WIDTH = 176;

export const POPUP_BUTTON_WIDTH = 40;

export const CHIP_PADDING_WIDTH = 46;

export const CHIPS_GAP_WIDTH = 8;

export const CHAR_WIDTH = 7.8;

export const DICTIONARIES_MODAL_STATES: Record<DictionariesModalState, DictionariesModalState> = {
  add: 'add',
  choose: 'choose',
  replace: 'replace',
  install: 'install',
  error: 'error',
  corrupt: 'corrupt'
};

export const AVAILABLE_DICTIONARY_TYPES: DictionaryType[] = ['meddra', 'whodrug'];

const AVAILABLE_MEDDRA_VERSIONS: OptionType[] = [
  { value: '25.1', label: '25.1' },
  { value: '25.0', label: '25.0' },
  { value: '24.1', label: '24.1' },
  { value: '24.0', label: '24.0' },
  { value: '23.1', label: '23.1' },
  { value: '23.0', label: '23.0' },
  { value: '22.1', label: '22.1' },
  { value: '22.0', label: '22.0' },
  { value: '21.1', label: '21.1' },
  { value: '21.0', label: '21.0' },
  { value: '20.1', label: '20.1' },
  { value: '20.0', label: '20.0' },
  { value: '19.1', label: '19.1' },
  { value: '19.0', label: '19.0' },
  { value: '18.1', label: '18.1' },
  { value: '18.0', label: '18.0' },
  { value: '17.1', label: '17.1' }
];

const AVAILABLE_WHODRUG_VERSIONS: OptionType[] = [
  { value: '2021-09', label: '2021-09' },
  { value: '2020-09', label: '2020-09' }
];

export const AVAILABLE_DICTIONARY_VERSIONS: Record<DictionaryType, OptionType[]> = {
  meddra: AVAILABLE_MEDDRA_VERSIONS,
  whodrug: AVAILABLE_WHODRUG_VERSIONS
};
