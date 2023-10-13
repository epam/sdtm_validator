import { TableHeaderType } from '@types';

export const DATASETS_TABLE_IDS = {
  fileName: 'fileName',
  datasetDomain: 'datasetDomain',
  path: 'path',
  files: 'files'
};

export const DATASETS_TABLE_LABELS = {
  fileName: 'File Name',
  datasetDomain: 'Dataset Domain',
  path: 'Path',
  files: 'Files'
};

export const DATASETS_TABLE_HEADERS: TableHeaderType[] = [
  { id: DATASETS_TABLE_IDS.fileName, label: DATASETS_TABLE_LABELS.fileName, minWidth: '140px', width: '20%' },
  { id: DATASETS_TABLE_IDS.datasetDomain, label: DATASETS_TABLE_LABELS.datasetDomain, minWidth: '140px', width: '15%' },
  { id: DATASETS_TABLE_IDS.path, label: DATASETS_TABLE_LABELS.path, minWidth: '140px', width: '55%' },
  { id: DATASETS_TABLE_IDS.files, label: DATASETS_TABLE_LABELS.files, minWidth: '100px', width: '10%', additionalProps: { align: 'right' } }
];
