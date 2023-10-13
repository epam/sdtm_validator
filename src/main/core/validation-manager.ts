import { IpcMainInvokeEvent } from 'electron';
import log from 'electron-log';

import { ERROR_MESSAGES, ERROR_STATUSES, ValidationOptionsType } from '../../common';
import { APP_DATA_PATH } from '..';
import { REPORTS_DIRECTORY } from '../constants';
import { getPath, getReportId, getValidationArguments, setError } from '../utils';
import { CdiscCoreManager } from './cdisc-core-manager';
import { DictionariesManager } from './dictionaries-manager';
import { FileSystemManager } from './file-system-manager';
import { NotificationManager } from './notification-manager';

const logger = log.scope('ValidationManager');

const checkDatasetsExistence = (datasetPaths: string[]) => {
  logger.info('Checking for the datasets existence...');

  datasetPaths.forEach((datasetPath) => {
    const isDatasetExist = FileSystemManager.isFileExist(datasetPath);

    if (!isDatasetExist) {
      logger.error(`Dataset ${datasetPath} does not exist`);

      throw Error(setError({ status: ERROR_STATUSES.datasetsExistenceError, message: ERROR_MESSAGES.datasetsExistenceError }));
    }
  });

  logger.info('All datasets exist');
};

const runValidation = async (_: IpcMainInvokeEvent, validationOptions: ValidationOptionsType) => {
  try {
    logger.info('Run new validation...');

    const { datasetPaths, selectedDictionaries } = validationOptions;

    checkDatasetsExistence(datasetPaths);

    await DictionariesManager.checkDictionariesIntegrity(_, selectedDictionaries);

    const reportId = getReportId();
    const outputPath = getPath(APP_DATA_PATH, REPORTS_DIRECTORY, reportId);
    const validationArguments = getValidationArguments({ ...validationOptions, outputPath });

    logger.info('Run cdisc engine...');

    await CdiscCoreManager.validateDatasets(validationArguments);

    logger.info(`Created report ${reportId}`);

    NotificationManager.showNotification({ body: 'Validation was successful' });

    return reportId;
  } catch (e) {
    setTimeout(() => {
      NotificationManager.showNotification({ body: 'Something went wrong during validation' });
    }, 400);

    logger.error(`${e}`);

    throw e;
  }
};

export const ValidationManager = {
  runValidation
};
