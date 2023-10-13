import { DatasetsSectionConnector, RulesSectionConnector, ViewReportSectionConnector } from '@connectors';

export const VALIDATION_STEPS = [
  { step: 0, label: 'Choose Datasets' },
  { step: 1, label: 'Choose Rules' },
  { step: 2, label: 'Validate' },
  { step: 3, label: 'View Report' }
];

export const VALIDATION_CONTENT: { [key: number]: JSX.Element } = {
  0: <DatasetsSectionConnector />,
  1: <RulesSectionConnector />,
  2: <RulesSectionConnector />,
  3: <ViewReportSectionConnector />,
  4: <ViewReportSectionConnector />
};
