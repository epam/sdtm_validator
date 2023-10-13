import { useCallback, useEffect, useRef, useState } from 'react';

import {
  AddDictionaryType,
  DictionaryCommonType,
  DictionaryType,
  ERROR_MESSAGES,
  ERROR_STATUSES,
  ErrorType,
  SelectedDictionariesType
} from '@common';
import { DictionariesModal, SelectedDictionaries } from '@components';
import { BROWSE_BUTTON_WIDTH, DICTIONARIES_MODAL_STATES } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectDictionariesAction } from '@redux';
import { DictionariesModalState, SelectChangeEvent } from '@types';
import { OutlinedButton } from '@ui-kit';
import { getError, getFilteredDictionaries } from '@utils';

import { Wrapper } from './part';

type DictionariesProps = {
  chooseDictionary: () => Promise<string>;
  installDictionary: (dictionary: AddDictionaryType, dictionaryPath: string) => Promise<void>;
  checkDictionaries: (dictionary: SelectedDictionariesType) => Promise<void>;
};

export const Dictionaries = ({ chooseDictionary, installDictionary, checkDictionaries }: DictionariesProps) => {
  const dispatch = useAppDispatch();

  const dictionariesWrapperRef = useRef<HTMLDivElement>();

  const selectedDictionaries = useAppSelector((state) => state.dictionaries.selected);
  const dictionaryVersions = useAppSelector((state) => state.dictionaries.all);
  const isOpenSideMenu = useAppSelector((state) => state.ui.isOpenSideMenu);

  const hasDictionary = Object.values(dictionaryVersions).some((versions) => !!versions.length);

  const [openDictionariesModal, setOpenDictionariesModal] = useState<boolean>(false);
  const [preselectedDictionaries, setPreselectedDictionaries] = useState<SelectedDictionariesType>({});
  const [availableWidth, setAvailableWidth] = useState<number>(0);
  const [modalState, setModalState] = useState<DictionariesModalState>(DICTIONARIES_MODAL_STATES.choose);
  const [error, setError] = useState<ErrorType>();
  const [corruptedDictionary, setCorruptedDictionary] = useState<DictionaryCommonType>();

  const clearError = () => setError(undefined);

  const closeError = () => {
    clearError();

    if (corruptedDictionary) {
      setModalState(DICTIONARIES_MODAL_STATES.corrupt);
      setError({ status: ERROR_STATUSES.dictionaryCorruptedError });

      return;
    }

    setModalState(DICTIONARIES_MODAL_STATES.add);
  };

  const showModal = () => {
    clearError();
    setOpenDictionariesModal(true);
    setPreselectedDictionaries(selectedDictionaries);
  };

  const closeModal = () => {
    setOpenDictionariesModal(false);
  };

  const handleCancel = () => {
    if (modalState === DICTIONARIES_MODAL_STATES.replace) {
      setModalState(DICTIONARIES_MODAL_STATES.add);

      return;
    }

    if (modalState === DICTIONARIES_MODAL_STATES.add && hasDictionary) {
      setModalState(DICTIONARIES_MODAL_STATES.choose);

      return;
    }

    if (modalState === DICTIONARIES_MODAL_STATES.corrupt) {
      setModalState(DICTIONARIES_MODAL_STATES.choose);

      return;
    }

    closeModal();
  };

  const handleOpenAdd = () => {
    setModalState(DICTIONARIES_MODAL_STATES.add);
  };

  const handleConfirm = async () => {
    try {
      await checkDictionaries(preselectedDictionaries);

      dispatch(selectDictionariesAction(preselectedDictionaries));

      closeModal();
    } catch (e) {
      const error = getError(e);

      setCorruptedDictionary(JSON.parse(error.message || '{}'));
      setError(error);
      setModalState(DICTIONARIES_MODAL_STATES.corrupt);
    }
  };

  const handleChangePreselectedVersion = (type: DictionaryType) => (event: SelectChangeEvent<unknown>) => {
    setPreselectedDictionaries((prevState) => ({ ...prevState, [type]: event.target.value as string }));
  };

  const handleInstall =
    ({ type, version, replace }: AddDictionaryType) =>
    async () => {
      try {
        if (!version) {
          setError({ status: ERROR_STATUSES.dictionaryNoVersionError, message: ERROR_MESSAGES.dictionaryNoVersionError });

          return;
        }

        if (!replace && dictionaryVersions[type]?.includes(version)) {
          setModalState(DICTIONARIES_MODAL_STATES.replace);

          return;
        }

        const dictionaryPath = await chooseDictionary();

        if (!dictionaryPath) return;

        setModalState(DICTIONARIES_MODAL_STATES.install);

        await installDictionary({ type, version, replace }, dictionaryPath);

        setPreselectedDictionaries((prevState) => ({ ...prevState, [type]: version }));

        setTimeout(() => {
          setModalState(DICTIONARIES_MODAL_STATES.choose);
        }, 400);
      } catch (e) {
        setTimeout(() => {
          setError(getError(e));
          setModalState(DICTIONARIES_MODAL_STATES.error);
        }, 400);
      }
    };

  const setDictionariesWidth = useCallback(() => {
    if (dictionariesWrapperRef.current) {
      setAvailableWidth(dictionariesWrapperRef.current.clientWidth - BROWSE_BUTTON_WIDTH);
    }
  }, [dictionariesWrapperRef.current, isOpenSideMenu]);

  useEffect(() => {
    window.addEventListener('resize', setDictionariesWidth);

    return () => window.removeEventListener('resize', setDictionariesWidth);
  }, []);

  useEffect(() => {
    setTimeout(setDictionariesWidth, 250);
  }, [isOpenSideMenu]);

  useEffect(() => {
    setModalState(hasDictionary ? DICTIONARIES_MODAL_STATES.choose : DICTIONARIES_MODAL_STATES.add);
  }, [hasDictionary]);

  return (
    <>
      <Wrapper ref={dictionariesWrapperRef}>
        <OutlinedButton title={hasDictionary ? 'Choose Dictionaries' : 'Add Dictionary'} onClick={showModal} />
        <SelectedDictionaries availableWidth={availableWidth} dictionaries={getFilteredDictionaries(selectedDictionaries)} />
      </Wrapper>
      <DictionariesModal
        clearError={clearError}
        closeError={closeError}
        closeModal={closeModal}
        corruptedDictionary={corruptedDictionary}
        dictionaryVersions={dictionaryVersions}
        error={error}
        handleCancel={handleCancel}
        handleChangePreselectedVersion={handleChangePreselectedVersion}
        handleConfirm={handleConfirm}
        handleInstall={handleInstall}
        handleOpenAdd={handleOpenAdd}
        modalState={modalState}
        open={openDictionariesModal}
        preselectedDictionaries={preselectedDictionaries}
      />
    </>
  );
};
