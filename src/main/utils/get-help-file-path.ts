import { APP_DATA_PATH } from '..';
import { HELP_DIRECTORY } from '../constants';
import { getPath } from './get-path';

export const getHelpFilePath = (fileName: string): string => getPath(APP_DATA_PATH, HELP_DIRECTORY, fileName);
