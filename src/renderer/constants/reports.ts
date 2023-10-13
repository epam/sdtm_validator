import { ReportContentType } from '@types';

export const REPORT_CONTENTS: ReportContentType[] = [
  { label: 'Data Model', valueKey: 'dataModel' },
  { label: 'Date and Time', valueKey: 'reportDate' },
  { label: 'Number of Datasets', valueKey: 'datasetsNumber' },
  { label: 'Number of Rules', valueKey: 'rulesNumber' },
  { label: 'Number of Issues', valueKey: 'issuesNumber' }
];

export const DATA_MODEL_MAPPING: { [key: string]: string } = {
  SDTMIG: 'SDTM'
};
