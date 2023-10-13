type CommonErrorStatusType = 'commonError';

type ValidationErrorStatusType = 'validationError' | 'noRulesError';

type RulesErrorStatusType = 'emptyRulesListError';

type DefineXmlErrorStatusType = 'defineValidationError' | 'defineXmlInvalidFormatError' | 'maxDefineXmlSizeError';

type ReportErrorStatusType = 'reportDetailsError' | 'reportError';

type DatasetErrorStatusType =
  | 'datasetsInvalidFormatError'
  | 'datasetsExistenceError'
  | 'maxDatasetsCountError'
  | 'minDatasetsCountError'
  | 'maxDatasetsSizeError';

type DictionaryErrorStatusType =
  | 'dictionaryNoVersionError'
  | 'dictionaryNotDirectoryError'
  | 'dictionaryMaxFilesError'
  | 'dictionaryMaxSizeError'
  | 'dictionaryIntegrityError'
  | 'dictionaryCorruptedError';

type AppErrorStatusType = 'userGuideError';

export type ErrorStatusType =
  | CommonErrorStatusType
  | RulesErrorStatusType
  | ValidationErrorStatusType
  | ReportErrorStatusType
  | DefineXmlErrorStatusType
  | DatasetErrorStatusType
  | DictionaryErrorStatusType
  | AppErrorStatusType;

export type ErrorType = {
  message?: string;
  status?: ErrorStatusType;
};
