import { DictionariesPage, HistoryPage, InfoPage, RuleManagementPage, ValidationPage } from '@pages';
import { RouteType } from '@types';
import { DictionariesIcon, ErrorIcon, HistoryIcon, PointerIcon, ValidatorIcon } from '@ui-kit';

export const ROUTE_PATHS = {
  default: '/',
  validation: '/validation',
  ruleManagement: '/rule-management',
  history: '/history',
  dictionaries: '/dictionaries',
  info: '/info'
};

export const ROUTES: RouteType[] = [
  { label: 'Validation', path: ROUTE_PATHS.validation, icon: <ValidatorIcon />, element: <ValidationPage /> },
  { label: 'Rule Management', path: ROUTE_PATHS.ruleManagement, icon: <PointerIcon />, element: <RuleManagementPage />, disabled: true },
  { label: 'History', path: ROUTE_PATHS.history, icon: <HistoryIcon />, element: <HistoryPage />, disabled: true },
  { label: 'Dictionaries', path: ROUTE_PATHS.dictionaries, icon: <DictionariesIcon />, element: <DictionariesPage />, disabled: true }
];

export const ADDITIONAL_ROUTES: RouteType[] = [{ label: 'Info', path: ROUTE_PATHS.info, icon: <ErrorIcon />, element: <InfoPage /> }];
