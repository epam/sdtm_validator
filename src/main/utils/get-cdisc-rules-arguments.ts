import { CdiscRulesArgumentsType } from '../types';

export const getCdiscRulesArguments = ({ standard, version, cachePath }: CdiscRulesArgumentsType) => [
  'list-rules',
  '-s',
  standard,
  '-v',
  version,
  '-c',
  cachePath
];
