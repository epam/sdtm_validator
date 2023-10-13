import { ERROR_STATUSES, ErrorStatusType } from '@common';

export const ERROR_TITLES: Partial<Record<ErrorStatusType, string>> = {
  commonError: 'Something Went Wrong',
  datasetsInvalidFormatError: 'Invalid File',
  reportDetailsError: 'Failed to Display',
  noRulesError: 'Failed to Validate',
  emptyRulesListError: 'Failed to Add Rules',
  datasetsExistenceError: 'Failed to Validate',
  validationError: 'Failed to Validate',
  reportError: 'Failed to Open',
  dictionaryNotDirectoryError: 'Failed to Add Dictionary',
  dictionaryIntegrityError: 'Failed to Add Dictionary',
  dictionaryMaxFilesError: 'Failed to Add Dictionary',
  dictionaryMaxSizeError: 'Failed to Add Dictionary',
  dictionaryCorruptedError: 'Failed to Validate',
  userGuideError: 'Failed to Open'
};

export const ERROR_SUPPORT: ErrorStatusType[] = [ERROR_STATUSES.commonError, ERROR_STATUSES.validationError, ERROR_STATUSES.reportError];
