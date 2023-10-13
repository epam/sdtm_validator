import omitBy from 'lodash/omitBy';

import { DICTIONARY_LABELS, DictionaryType, SelectedDictionariesType } from '@common';
import {
  AVAILABLE_DICTIONARY_TYPES,
  CHAR_WIDTH,
  CHIP_PADDING_WIDTH,
  CHIPS_GAP_WIDTH,
  NOT_SELECTED_DICTIONARY,
  POPUP_BUTTON_WIDTH
} from '@constants';
import { DictionariesChipsType, DictionaryChipType, OptionType } from '@types';

export const getFormattedDictionaryVersions = (versions: string[]): OptionType[] => {
  const formattedVersions = versions.map((version) => ({ label: version, value: version }));
  const notSelected = { value: NOT_SELECTED_DICTIONARY, label: 'Not selected' };

  return [notSelected, ...formattedVersions];
};

export const getFilteredDictionaries = (dictionaries: SelectedDictionariesType) =>
  omitBy(dictionaries, (version) => version === NOT_SELECTED_DICTIONARY);

const getDictionaryChipWidth = ({ type, version }: DictionaryChipType): number =>
  `${DICTIONARY_LABELS[type]}: ${version}`.length * CHAR_WIDTH + CHIP_PADDING_WIDTH;

export const getDictionariesChips = (dictionaries: SelectedDictionariesType, availableWidth: number): DictionariesChipsType => {
  availableWidth -= POPUP_BUTTON_WIDTH;

  const dictionariesChips = Object.entries(dictionaries)
    .sort(
      ([typeA], [typeB]) =>
        AVAILABLE_DICTIONARY_TYPES.indexOf(typeA as DictionaryType) - AVAILABLE_DICTIONARY_TYPES.indexOf(typeB as DictionaryType)
    )
    .reduce(
      (acc, [type, version]) => {
        const dictionary = { type, version } as DictionaryChipType;
        const dictionaryChipWidth = getDictionaryChipWidth(dictionary);
        const widthDifference = availableWidth - (dictionaryChipWidth + CHIPS_GAP_WIDTH);

        if (widthDifference >= 0) {
          availableWidth -= dictionaryChipWidth + CHIPS_GAP_WIDTH;
          acc.displayed.push(dictionary);
        } else {
          acc.hidden.push({ ...dictionary, width: dictionaryChipWidth });
        }

        return acc;
      },
      { displayed: [], hidden: [] } as DictionariesChipsType
    );

  if (dictionariesChips.hidden.length === 1) {
    const hiddenChip = dictionariesChips.hidden[0];

    if (availableWidth + POPUP_BUTTON_WIDTH >= hiddenChip.width!) {
      dictionariesChips.displayed.push(hiddenChip);
      dictionariesChips.hidden = [];
    }
  }

  return dictionariesChips;
};
