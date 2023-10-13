export type ValueKeyType = 'dataModel' | 'reportDate' | 'datasetsNumber' | 'rulesNumber' | 'issuesNumber';

export type ReportContentType = {
  label: string;
  valueKey: ValueKeyType;
};

export type ReportDetailsType = Record<ValueKeyType, string>;
