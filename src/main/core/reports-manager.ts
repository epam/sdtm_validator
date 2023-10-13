import { IpcMainInvokeEvent } from 'electron';
import log from 'electron-log';

import { ERROR_MESSAGES, ERROR_STATUSES } from '../../common';
import { getCopyName, getReportPath, getReportSavePath, setError, toCamelCase } from '../utils';
import { FileSystemManager } from './file-system-manager';
import { NotificationManager } from './notification-manager';

const logger = log.scope('ReportsManager');

const saveReport = async (reportId: string, reportName: string) => {
  logger.info(`Saving report ${reportId} to downloads...`);

  const reportSavePath = getReportSavePath(reportName);

  logger.info(`Path to save ${reportSavePath}`);

  await FileSystemManager.copyFile(getReportPath(reportId), getReportSavePath(reportName));

  const showSavedReportInDirectory = () => {
    FileSystemManager.showFileInDirectory(reportSavePath);
  };

  logger.info('Report saved');

  NotificationManager.showNotification({ body: 'Report was saved in downloads' }, { onClick: showSavedReportInDirectory });
};

const openSavedReport = async (reportName: string) => {
  logger.info(`Opening saved report...`);

  const reportSavePath = getReportSavePath(reportName);

  logger.info(`Path to report ${reportSavePath}`);

  const error = await FileSystemManager.openFile(reportSavePath);

  if (error) {
    logger.error(`${error} ${reportSavePath}`);

    throw Error(setError({ status: ERROR_STATUSES.reportError, message: ERROR_MESSAGES.reportError }));
  }

  logger.info('Report opened');
};

const saveAndOpenReport = async (_: IpcMainInvokeEvent, reportId: string) => {
  try {
    logger.info(`Getting report ${reportId}...`);

    const reportName = getCopyName(getReportSavePath, reportId);

    await saveReport(reportId, reportName);
    await openSavedReport(reportName);
  } catch (e) {
    logger.error(`${e}`);

    throw e;
  }
};

const getReportDetails = async (_: IpcMainInvokeEvent, reportId: string): Promise<any> => {
  try {
    logger.info(`Getting report details for ${reportId}...`);

    const reportData = await FileSystemManager.readFile(getReportPath(reportId, 'json'));
    const reportDetails = toCamelCase(JSON.parse(reportData));

    logger.info(`Report received`);

    return reportDetails;
  } catch (e) {
    logger.error(`${e}`);

    throw Error(setError({ status: ERROR_STATUSES.reportDetailsError, message: ERROR_MESSAGES.reportDetailsError }));
  }
};

export const ReportsManager = {
  saveAndOpenReport,
  getReportDetails
};
