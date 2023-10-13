import { COMMON_ERROR, ERROR_TAG, ErrorType } from '../../common';

export const setError = (error: ErrorType = COMMON_ERROR): string => `${ERROR_TAG}${JSON.stringify(error)}`;
