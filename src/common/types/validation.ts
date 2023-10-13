import { SelectedDictionariesType } from './dictionaries';

export type ValidationOptionsType = {
  datasetPaths: string[];
  standard: string;
  version: string;
  ct: string;
  defineXmlPath: string;
  selectedCdiscRules: string[];
  selectedDictionaries: SelectedDictionariesType;
};
