import { useState } from 'react';

import { DictionaryCommonType, ERROR_MESSAGES, ERROR_STATUSES, ErrorType, IPC_CONNECTOR_NAME, ValidationOptionsType } from '@common';
import { RulesSection, ValidationModal } from '@components';
import { useAppDispatch } from '@hooks';
import { lastValidationStepAction, nextValidationStepAction, prevValidationStepAction, setReportIdAction } from '@redux';
import { getError } from '@utils';

const DICTIONARY_VALIDATION_ERRORS = [
  ERROR_STATUSES.dictionaryMaxFilesError,
  ERROR_STATUSES.dictionaryMaxSizeError,
  ERROR_STATUSES.dictionaryIntegrityError,
  ERROR_STATUSES.dictionaryNotDirectoryError
];

export const RulesSectionConnector = () => {
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isInstallingDictionary, setInstallingDictionary] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>();
  const [savedValidationOptions, setSavedValidationOptions] = useState<ValidationOptionsType>();
  const [corruptedDictionary, setCorruptedDictionary] = useState<DictionaryCommonType>();

  const showModal = () => {
    setError(undefined);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    if (DICTIONARY_VALIDATION_ERRORS.includes(error?.status || ERROR_STATUSES.commonError)) {
      setError({ status: ERROR_STATUSES.dictionaryCorruptedError });

      return;
    }

    closeModal();
  };

  const runValidation = async (validationOptions: ValidationOptionsType) => {
    try {
      showModal();
      setSavedValidationOptions(validationOptions);

      const { selectedCdiscRules } = validationOptions;

      if (!selectedCdiscRules.length) {
        setError({ status: ERROR_STATUSES.noRulesError, message: ERROR_MESSAGES.noRulesError });

        return;
      }

      dispatch(nextValidationStepAction());

      const reportId = await window[IPC_CONNECTOR_NAME].runValidation(validationOptions);

      dispatch(setReportIdAction(reportId));
      closeModal();
      dispatch(lastValidationStepAction());
    } catch (e) {
      setTimeout(() => {
        dispatch(prevValidationStepAction());

        const error = getError(e);

        if (error.status === ERROR_STATUSES.dictionaryCorruptedError) {
          setCorruptedDictionary(JSON.parse(error.message || '{}'));
        }

        setError(error);
      }, 400);
    }
  };

  const handleReplace =
    ({ type, version }: DictionaryCommonType) =>
    async () => {
      try {
        const dictionaryPath = await window[IPC_CONNECTOR_NAME].chooseDictionary();

        if (!dictionaryPath) return;

        setInstallingDictionary(true);

        await window[IPC_CONNECTOR_NAME].installDictionary({ type, version, replace: true }, dictionaryPath);

        setTimeout(() => {
          setInstallingDictionary(false);

          if (savedValidationOptions) {
            runValidation(savedValidationOptions);
          } else {
            closeModal();
          }
        }, 400);
      } catch (e) {
        setTimeout(() => {
          setError(getError(e));
          setInstallingDictionary(false);
        }, 400);
      }
    };

  return (
    <>
      <RulesSection runValidation={runValidation} />
      <ValidationModal
        corruptedDictionary={corruptedDictionary}
        error={error}
        handleClose={handleClose}
        handleReplace={handleReplace}
        isInstallingDictionary={isInstallingDictionary}
        open={openModal}
      />
    </>
  );
};
