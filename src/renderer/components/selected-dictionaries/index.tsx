import { MouseEvent, useEffect, useState } from 'react';

import { DictionaryType, SelectedDictionariesType } from '@common';
import { useAppDispatch } from '@hooks';
import { unselectDictionaryAction } from '@redux';
import { DictionariesChipsType, DictionaryChipType } from '@types';
import { DictionaryChip } from '@ui-kit';
import { getDictionariesChips } from '@utils';

import { Menu, MenuListStyle, PaperStyle, PopupButton, Wrapper } from './parts';

type SelectedDictionariesProps = {
  dictionaries: SelectedDictionariesType;
  availableWidth: number;
};

export const SelectedDictionaries = ({ dictionaries, availableWidth }: SelectedDictionariesProps) => {
  const dispatch = useAppDispatch();

  const [{ displayed, hidden }, setDictionariesChips] = useState<DictionariesChipsType>({ displayed: [], hidden: [] });
  const [popupButtonRef, setPopupButtonRef] = useState<HTMLElement | null>();

  const openPopup = (event: MouseEvent<HTMLElement>) => {
    setPopupButtonRef(event.currentTarget);
  };

  const closePopup = () => {
    setPopupButtonRef(null);
  };

  const unsetDictionary = (type: DictionaryType) => () => {
    dispatch(unselectDictionaryAction(type));
  };

  const renderDictionariesChips = (chips: DictionaryChipType[]) =>
    chips.map(({ type, version }) => <DictionaryChip key={type} handleRemove={unsetDictionary(type)} type={type} version={version} />);

  useEffect(() => {
    if (availableWidth) {
      const chips = getDictionariesChips(dictionaries, availableWidth);

      setDictionariesChips(chips);
    }
  }, [dictionaries, availableWidth]);

  return (
    <Wrapper>
      {renderDictionariesChips(displayed)}
      {!!hidden.length && (
        <PopupButton onClick={openPopup}>{displayed.length ? `+${hidden.length}` : `${hidden.length} Selected`}</PopupButton>
      )}
      <Menu
        MenuListProps={MenuListStyle}
        PaperProps={PaperStyle}
        anchorEl={popupButtonRef}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={Boolean(popupButtonRef)}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        onClose={closePopup}>
        {renderDictionariesChips(hidden)}
      </Menu>
    </Wrapper>
  );
};
