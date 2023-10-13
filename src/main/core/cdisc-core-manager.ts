import { spawn } from 'child_process';
import log from 'electron-log';

import { ERROR_MESSAGES, ERROR_STATUSES } from '../../common';
import { execFile, getCdiscCorePath, setError, toCamelCase } from '../utils';

const logger = log.scope('CdiscCoreManager');

const validateDatasets = async (validationArguments: string[]) => {
  const datasetsValidationProcess = new Promise<void>((resolve, reject) => {
    const handleError = () => {
      childProcess.kill();
      reject();
    };

    logger.info('Start datasets validation process...');

    const childProcess = spawn(getCdiscCorePath(process.platform), validationArguments);

    logger.info(`${childProcess.spawnargs.join(' ')}`);

    childProcess.on('error', (e) => {
      logger.error('Failed to run datasets validation process');
      logger.error(`${e.message}`);

      handleError();
    });

    childProcess.on('close', (code) => {
      if (code === 0) {
        logger.info('Datasets validation process finished');

        resolve();
      } else {
        logger.error(`Datasets validation process closed with code ${code}`);

        handleError();
      }
    });

    childProcess.stdout.on('data', (data) => {
      logger.info(`[stdout]: Datasets validation process progress\n${data.toString()}`);
    });

    childProcess.stdout.on('error', (e) => {
      logger.error('[stdout]: Error during datasets validation process');
      logger.error(`[stdout]: ${e.message}`);

      handleError();
    });

    childProcess.stdout.on('close', () => {
      logger.info('[stdout]: Datasets validation process closed');
    });

    childProcess.stderr.on('data', (data) => {
      logger.info(`[stderr]: Datasets validation process progress\n${data.toString()}`);
    });

    childProcess.stderr.on('error', (e) => {
      logger.error('[stderr]: Error during datasets validation process');
      logger.error(`[stderr]: ${e.message}`);

      handleError();
    });

    childProcess.stderr.on('close', () => {
      logger.info('[stderr]: Datasets validation process closed');
    });
  });

  try {
    await datasetsValidationProcess;
  } catch (e) {
    logger.error(`${e}`);

    throw Error(setError({ status: ERROR_STATUSES.validationError, message: ERROR_MESSAGES.validationError }));
  }
};

const getRulesList = async (rulesArguments: string[]) => {
  logger.info('Getting rules list...');

  const cdiscCore = getCdiscCorePath(process.platform);

  logger.info(`${cdiscCore} ${rulesArguments.join(' ')}`);

  const { stdout } = await execFile(cdiscCore, rulesArguments);
  const rulesList = toCamelCase(JSON.parse(stdout));

  logger.info('Rules list received');

  return rulesList;
};

export const CdiscCoreManager = {
  validateDatasets,
  getRulesList
};
