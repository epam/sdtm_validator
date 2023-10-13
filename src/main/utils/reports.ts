import dayjs from 'dayjs';
import { app } from 'electron';
import { nanoid } from 'nanoid';

import { APP_DATA_PATH, DOWNLOADS_PATH } from '..';
import { REPORTS_DIRECTORY } from '../constants';
import { getPath } from './get-path';
import { toKebabCase } from './to-kebab-case';

const getReportsPath = () => getPath(APP_DATA_PATH, REPORTS_DIRECTORY);

export const getReportPath = (reportId: string, reportExt: string = 'xlsx') => getPath(getReportsPath(), `${reportId}.${reportExt}`);

export const getReportSavePath = (reportName: string, reportExt: string = 'xlsx') => getPath(DOWNLOADS_PATH, `${reportName}.${reportExt}`);

export const getReportId = () => {
  const date = dayjs().format('YYYY-MM-DD');
  const appName = toKebabCase(app.getName());
  const reportId = `${appName}-report-${date}-${nanoid(6)}`;

  return reportId;
};
