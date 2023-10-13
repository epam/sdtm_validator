import { DictionaryType } from '../../common';
import { APP_PATH } from '..';
import { RESOURCES_DIRECTORY } from '../constants';
import { ValidationArgumentsType } from '../types';
import { getDictionaryPath } from './dictionaries';
import { getPath } from './get-path';

export const getValidationArguments = ({
  datasetPaths,
  standard,
  version,
  ct,
  outputPath,
  defineXmlPath,
  selectedCdiscRules,
  selectedDictionaries
}: ValidationArgumentsType) => {
  const datasets: string[] = datasetPaths.reduce((acc, datasetPath) => [...acc, '-dp', datasetPath], [] as string[]);
  const rules: string[] = selectedCdiscRules.reduce((acc, ruleId) => [...acc, '-r', ruleId], [] as string[]);
  const defineXml = defineXmlPath ? ['-dv', defineXmlPath] : [];
  const cdiscCoreLevelLogs = process.env.CDISC_CORE_LOG_LEVEL || 'critical';
  const logs = ['-l', cdiscCoreLevelLogs];
  const dictionaries = Object.entries(selectedDictionaries).flatMap(([type, version]) => [
    `--${type}`,
    getDictionaryPath(type as DictionaryType, version)
  ]);

  return [
    'validate',
    '-s',
    standard,
    '-v',
    version,
    '-ct',
    ct,
    '-o',
    outputPath,
    '-of',
    'XLSX',
    '-rt',
    getPath(APP_PATH, RESOURCES_DIRECTORY, 'report-template.xlsx'),
    '-of',
    'JSON',
    ...defineXml,
    ...logs,
    ...rules,
    ...datasets,
    ...dictionaries
  ];
};
