import { SyntheticEvent, useEffect, useState } from 'react';

import {
  AddDictionaryType,
  DictionariesVersionsType,
  DICTIONARY_LABELS,
  DictionaryCommonType,
  DictionaryType,
  ErrorType,
  SelectedDictionariesType
} from '@common';
import { ErrorContent } from '@components';
import { AVAILABLE_DICTIONARY_TYPES, AVAILABLE_DICTIONARY_VERSIONS, DICTIONARIES_MODAL_STATES, NOT_SELECTED_DICTIONARY } from '@constants';
import { DictionariesModalState, SelectChangeEvent } from '@types';
import { DictionaryTab, DictionaryTabs, Modal, OutlinedButton, PrimaryButton, Select, Spinner, TextButton } from '@ui-kit';
import { getFormattedDictionaryVersions } from '@utils';

import {
  AddTitle,
  AddWrapper,
  ChooseWrapper,
  CorruptWrapper,
  DictionaryLabel,
  ErrorMessage,
  ErrorTitle,
  InstallMessage,
  InstallWrapper,
  ReplaceTitle,
  ReplaceWrapper,
  Toolbar,
  Wrapper
} from './parts';

type CorruptContentProps = {
  dictionary: DictionaryCommonType;
  handleCancel: () => void;
  handleReplace: (dictionary: AddDictionaryType) => () => Promise<void>;
};

export const CorruptContent = ({ dictionary, handleCancel, handleReplace }: CorruptContentProps) => {
  const { type, version } = dictionary;

  return (
    <CorruptWrapper>
      <ErrorTitle>Dictionary Is Corrupted</ErrorTitle>
      <ErrorMessage>
        Some of<DictionaryLabel>{` ${DICTIONARY_LABELS[type]} ${version} `}</DictionaryLabel>files were removed or corrupted. Please
        reinstall this dictionary
      </ErrorMessage>
      <Toolbar>
        <TextButton title="Cancel" onClick={handleCancel} />
        <OutlinedButton title="Replace" onClick={handleReplace({ type, version, replace: true })} />
      </Toolbar>
    </CorruptWrapper>
  );
};

export const InstallContent = () => (
  <InstallWrapper>
    <InstallMessage>Installing...</InstallMessage>
    <Spinner size={80} />
  </InstallWrapper>
);

type ReplaceContentProps = {
  type: DictionaryType;
  version: string;
  handleCancel: () => void;
  handleReplace: () => Promise<void>;
};

const ReplaceContent = ({ type, version, handleCancel, handleReplace }: ReplaceContentProps) => (
  <ReplaceWrapper>
    <ReplaceTitle>Dictionary Is Already Installed</ReplaceTitle>
    <ErrorMessage>
      <DictionaryLabel>{`${DICTIONARY_LABELS[type]} ${version}`}</DictionaryLabel>
      {' is already installed.\nDo you want replace it?'}
    </ErrorMessage>
    <Toolbar>
      <TextButton title="Cancel" onClick={handleCancel} />
      <OutlinedButton title="Replace" onClick={handleReplace} />
    </Toolbar>
  </ReplaceWrapper>
);

type AddContentProps = {
  type: DictionaryType;
  version: string;
  error?: ErrorType;
  handleCancel: () => void;
  handleBrowse: () => Promise<void>;
  handleChangeVersion: (event: SelectChangeEvent<unknown>) => void;
  handleChangeType: (_: SyntheticEvent, type: DictionaryType) => void;
};

const AddContent = ({ type, version, handleChangeType, handleChangeVersion, handleCancel, handleBrowse, error }: AddContentProps) => (
  <AddWrapper>
    <AddTitle>Type of dictionary</AddTitle>
    <DictionaryTabs value={type} variant="scrollable" onChange={handleChangeType}>
      {AVAILABLE_DICTIONARY_TYPES.map((dictionaryType) => (
        <DictionaryTab key={dictionaryType} label={DICTIONARY_LABELS[dictionaryType]} value={dictionaryType} disableRipple />
      ))}
    </DictionaryTabs>
    <Select
      error={error?.message}
      handleChange={handleChangeVersion}
      label="Version"
      options={AVAILABLE_DICTIONARY_VERSIONS[type]}
      value={version}
    />
    <Toolbar>
      <TextButton title="Cancel" onClick={handleCancel} />
      <PrimaryButton title="Browse Dictionary" onClick={handleBrowse} />
    </Toolbar>
  </AddWrapper>
);

type ChooseContentProps = {
  dictionaryVersions: DictionariesVersionsType;
  preselectedDictionaries: SelectedDictionariesType;
  handleChangeVersion: (dictionary: DictionaryType) => (event: SelectChangeEvent<unknown>) => void;
  handleAdd: () => void;
  handleConfirm: () => void;
};

const ChooseContent = ({
  dictionaryVersions,
  preselectedDictionaries,
  handleChangeVersion,
  handleAdd,
  handleConfirm
}: ChooseContentProps) => {
  const renderAvailableDictionaries = (availableDictionaries: DictionaryType[]) =>
    availableDictionaries.map(
      (type) =>
        dictionaryVersions[type] && (
          <Select
            key={type}
            handleChange={handleChangeVersion(type)}
            label={DICTIONARY_LABELS[type]}
            options={getFormattedDictionaryVersions(dictionaryVersions[type]!)}
            value={preselectedDictionaries[type] || NOT_SELECTED_DICTIONARY}
          />
        )
    );

  return (
    <ChooseWrapper>
      {renderAvailableDictionaries(AVAILABLE_DICTIONARY_TYPES)}
      <Toolbar>
        <TextButton title="Add Dictionary" onClick={handleAdd} />
        <PrimaryButton title="Confirm" onClick={handleConfirm} />
      </Toolbar>
    </ChooseWrapper>
  );
};

type DictionariesModalProps = {
  open: boolean;
  modalState: DictionariesModalState;
  dictionaryVersions: DictionariesVersionsType;
  preselectedDictionaries: SelectedDictionariesType;
  corruptedDictionary?: DictionaryCommonType;
  error?: ErrorType;
  handleChangePreselectedVersion: (dictionary: DictionaryType) => (event: SelectChangeEvent<unknown>) => void;
  closeModal: () => void;
  handleCancel: () => void;
  handleOpenAdd: () => void;
  handleConfirm: () => void;
  handleInstall: (dictionary: AddDictionaryType) => () => Promise<void>;
  closeError: () => void;
  clearError: () => void;
};

export const DictionariesModal = ({
  open,
  modalState,
  dictionaryVersions,
  preselectedDictionaries,
  corruptedDictionary,
  error,
  handleChangePreselectedVersion,
  closeModal,
  handleInstall,
  handleCancel,
  handleOpenAdd,
  handleConfirm,
  closeError,
  clearError
}: DictionariesModalProps) => {
  const [type, setType] = useState<DictionaryType>(AVAILABLE_DICTIONARY_TYPES[0]);
  const [versions, setVersions] = useState<SelectedDictionariesType>({});

  const setDefault = () => {
    setType(AVAILABLE_DICTIONARY_TYPES[0]);
    setVersions({});
  };

  const handleChangeVersion = (type: DictionaryType) => (event: SelectChangeEvent<unknown>) => {
    clearError();
    setVersions((prevState) => ({ ...prevState, [type]: event.target.value as string }));
  };

  const handleChangeType = (_: SyntheticEvent, type: DictionaryType) => {
    clearError();
    setType(type);
  };

  const handleAdd = () => {
    setDefault();
    handleOpenAdd();
  };

  const titleByState = {
    [DICTIONARIES_MODAL_STATES.add]: 'Add Dictionary',
    [DICTIONARIES_MODAL_STATES.choose]: 'Dictionaries'
  };

  const closeByState = {
    [DICTIONARIES_MODAL_STATES.add]: handleCancel,
    [DICTIONARIES_MODAL_STATES.choose]: closeModal
  };

  useEffect(() => {
    if (open) {
      setDefault();
    }
  }, [open]);

  return (
    <Modal handleClose={closeByState[modalState]} open={open} title={titleByState[modalState]}>
      <Wrapper>
        {modalState === DICTIONARIES_MODAL_STATES.replace && (
          <ReplaceContent
            handleCancel={handleCancel}
            handleReplace={handleInstall({ type, version: versions[type] || '', replace: true })}
            type={type}
            version={versions[type] || ''}
          />
        )}
        {modalState === DICTIONARIES_MODAL_STATES.add && (
          <AddContent
            error={error}
            handleBrowse={handleInstall({ type, version: versions[type] || '' })}
            handleCancel={handleCancel}
            handleChangeType={handleChangeType}
            handleChangeVersion={handleChangeVersion(type)}
            type={type}
            version={versions[type] || ''}
          />
        )}
        {modalState === DICTIONARIES_MODAL_STATES.choose && (
          <ChooseContent
            dictionaryVersions={dictionaryVersions}
            handleAdd={handleAdd}
            handleChangeVersion={handleChangePreselectedVersion}
            handleConfirm={handleConfirm}
            preselectedDictionaries={preselectedDictionaries}
          />
        )}
        {modalState === DICTIONARIES_MODAL_STATES.install && <InstallContent />}
        {modalState === DICTIONARIES_MODAL_STATES.corrupt && (
          <CorruptContent dictionary={corruptedDictionary!} handleCancel={handleCancel} handleReplace={handleInstall} />
        )}
        {modalState === DICTIONARIES_MODAL_STATES.error && error && <ErrorContent error={error} handleClose={closeError} />}
      </Wrapper>
    </Modal>
  );
};
