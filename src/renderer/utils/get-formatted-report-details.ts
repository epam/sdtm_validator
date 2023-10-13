import dayjs from 'dayjs';

import { DATA_MODEL_MAPPING } from '@constants';
import { ReportDetailsType } from '@types';

const getEntitiesNumber = (entity: any): string => {
  if (entity) {
    return String(entity.length);
  }

  return 'N/A';
};

export const getFormattedReportDetails = (rawReportDetails: any): ReportDetailsType => {
  const {
    conformanceDetails: { reportDate: rawReportDate, dataPath },
    bundleDetails: { standard },
    rulesReportData,
    detailedData
  } = rawReportDetails;

  const dataModel = DATA_MODEL_MAPPING[standard] || 'N/A';
  const reportDate = rawReportDate ? dayjs(rawReportDate).format('DD.MM.YYYY HH:mm') : 'N/A';
  const datasetsNumber = getEntitiesNumber(dataPath);
  const rulesNumber = getEntitiesNumber(rulesReportData);
  const issuesNumber = getEntitiesNumber(detailedData);

  return { dataModel, reportDate, datasetsNumber, rulesNumber, issuesNumber };
};
