import { IpcMainInvokeEvent } from 'electron';
import log from 'electron-log';

import { CdiscRulesOptionsType, ERROR_MESSAGES, ERROR_STATUSES } from '../../common';
import { getCdiscCoreCachePath, getCdiscRulesArguments, setError } from '../utils';
import { CdiscCoreManager } from './cdisc-core-manager';

const logger = log.scope('RulesManager');

const getCdiscRules = async (_: IpcMainInvokeEvent, cdiscRulesOptions: CdiscRulesOptionsType) => {
  try {
    logger.info('Getting cdisc rules...');

    const cachePath = getCdiscCoreCachePath(process.platform);
    const rulesArguments = getCdiscRulesArguments({ ...cdiscRulesOptions, cachePath });

    const cdiscRules = await CdiscCoreManager.getRulesList(rulesArguments);

    if (!cdiscRules.length) {
      logger.error(`Rule list is empty`);

      throw Error(setError({ status: ERROR_STATUSES.emptyRulesListError, message: ERROR_MESSAGES.emptyRulesListError }));
    }

    return cdiscRules;
  } catch (e) {
    logger.error(`${e}`);

    throw e;
  }
};

export const RulesManager = {
  getCdiscRules
};
