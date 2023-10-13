import { COMMON_ERROR, ERROR_TAG, ErrorType } from '@common';

export const getError = (error?: unknown): ErrorType => {
  try {
    return JSON.parse((error as ErrorType).message?.split(ERROR_TAG).at(-1) || JSON.stringify(COMMON_ERROR));
  } catch {
    return COMMON_ERROR;
  }
};
