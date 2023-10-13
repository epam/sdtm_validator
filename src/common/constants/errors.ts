import { ErrorStatusType, ErrorType } from '../types';
import { getFormattedSize } from '../utils';
import { MAX_DATASETS_COUNT, MAX_DATASETS_SIZE } from './datasets';
import { MAX_DEFINE_XML_SIZE } from './define-xml';

export const ERROR_STATUSES: Record<ErrorStatusType, ErrorStatusType> = {
  commonError: 'commonError',
  datasetsInvalidFormatError: 'datasetsInvalidFormatError',
  emptyRulesListError: 'emptyRulesListError',
  noRulesError: 'noRulesError',
  datasetsExistenceError: 'datasetsExistenceError',
  validationError: 'validationError',
  reportDetailsError: 'reportDetailsError',
  reportError: 'reportError',
  maxDatasetsCountError: 'maxDatasetsCountError',
  minDatasetsCountError: 'minDatasetsCountError',
  maxDatasetsSizeError: 'maxDatasetsSizeError',
  defineValidationError: 'defineValidationError',
  defineXmlInvalidFormatError: 'defineXmlInvalidFormatError',
  maxDefineXmlSizeError: 'maxDefineXmlSizeError',
  dictionaryIntegrityError: 'dictionaryIntegrityError',
  dictionaryMaxFilesError: 'dictionaryMaxFilesError',
  dictionaryMaxSizeError: 'dictionaryMaxSizeError',
  dictionaryNotDirectoryError: 'dictionaryNotDirectoryError',
  dictionaryNoVersionError: 'dictionaryNoVersionError',
  dictionaryCorruptedError: 'dictionaryCorruptedError',
  userGuideError: 'userGuideError'
};

export const ERROR_MESSAGES: Record<ErrorStatusType, string> = {
  commonError: 'Please contact support',
  maxDatasetsCountError: `The  maximum number of files is ${MAX_DATASETS_COUNT} items`,
  minDatasetsCountError: 'At least one .xpt file has to be uploaded',
  maxDatasetsSizeError: `The maximum total size is ${getFormattedSize(MAX_DATASETS_SIZE)}`,
  datasetsInvalidFormatError: 'At least one of the files you were trying to upload is not valid',
  defineValidationError: 'Please try again or remove define file',
  reportDetailsError: 'Unfortunately it is not possible to display short summary of the report but you can download it',
  noRulesError: 'At least one of the rules has to be selected',
  emptyRulesListError: 'No rules are available because such version does not exist in CDISC library',
  datasetsExistenceError: 'At least one of chosen datasets was not found',
  validationError: 'Something went wrong.\nPlease contact support to solve the problem',
  reportError: 'The report is corrupted or can not be found. Please try to validate again.\nIf the problem persist contact support',
  defineXmlInvalidFormatError: 'The file is not a valid xml',
  maxDefineXmlSizeError: `The maximum size is ${getFormattedSize(MAX_DEFINE_XML_SIZE)}`,
  dictionaryNoVersionError: 'This field is required',
  dictionaryNotDirectoryError: 'Dictionary have to be a directory',
  dictionaryIntegrityError: 'does not contain all required files',
  dictionaryMaxFilesError: `The maximum number of files is`,
  dictionaryMaxSizeError: `The maximum total size is`,
  dictionaryCorruptedError: 'files were  removed or corrupted. Please reinstall this dictionary',
  userGuideError: 'Can not open user guide'
};

export const COMMON_ERROR: ErrorType = { status: ERROR_STATUSES.commonError, message: ERROR_MESSAGES.commonError };

export const ERROR_TAG = '[CustomError]';
