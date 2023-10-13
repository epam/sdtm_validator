import { contextBridge, ipcRenderer } from 'electron';

import {
  AddDictionaryType,
  AppInfoType,
  CdiscRulesOptionsType,
  DatasetType,
  DictionariesVersionsType,
  IPC_CONNECTOR_NAME,
  SelectedDictionariesType,
  ValidationOptionsType
} from '../common';
import { IPC_MESSAGES } from './constants';

const ipcConnector = {
  chooseDatasets: (): Promise<string[]> => ipcRenderer.invoke(IPC_MESSAGES.chooseDatasets),
  getDatasetsMetadata: (datasetPaths: string[]): Promise<DatasetType[]> =>
    ipcRenderer.invoke(IPC_MESSAGES.getDatasetsMetadata, datasetPaths),
  validateDatasetPaths: (datasetPaths: string[]): Promise<string[]> => ipcRenderer.invoke(IPC_MESSAGES.validateDatasetPaths, datasetPaths),
  runValidation: (validationOptions: ValidationOptionsType): Promise<string> =>
    ipcRenderer.invoke(IPC_MESSAGES.runValidation, validationOptions),
  saveAndOpenReport: (reportId: string): Promise<void> => ipcRenderer.invoke(IPC_MESSAGES.saveAndOpenReport, reportId),
  getReportDetails: (reportId: string): Promise<any> => ipcRenderer.invoke(IPC_MESSAGES.getReportDetails, reportId),
  getCdiscRules: (cdiscRulesOptions: CdiscRulesOptionsType): Promise<any> =>
    ipcRenderer.invoke(IPC_MESSAGES.getCdiscRules, cdiscRulesOptions),
  chooseDefineXml: (): Promise<string> => ipcRenderer.invoke(IPC_MESSAGES.chooseDefineXml),
  validateDefineXml: (defineXmlPath: string): Promise<string[]> => ipcRenderer.invoke(IPC_MESSAGES.validateDefineXml, defineXmlPath),
  getAppInfo: (): Promise<AppInfoType> => ipcRenderer.invoke(IPC_MESSAGES.getAppInfo),
  openUserGuide: (): Promise<void> => ipcRenderer.invoke(IPC_MESSAGES.openUserGuide),
  chooseDictionary: (): Promise<string> => ipcRenderer.invoke(IPC_MESSAGES.chooseDictionary),
  installDictionary: (dictionary: AddDictionaryType, dictionaryPath: string): Promise<void> =>
    ipcRenderer.invoke(IPC_MESSAGES.installDictionary, dictionary, dictionaryPath),
  getDictionaries: (): Promise<DictionariesVersionsType> => ipcRenderer.invoke(IPC_MESSAGES.getDictionaries),
  checkDictionaries: (dictionaries: SelectedDictionariesType): Promise<void> =>
    ipcRenderer.invoke(IPC_MESSAGES.checkDictionaries, dictionaries),
  closeApp: (): Promise<void> => ipcRenderer.invoke(IPC_MESSAGES.closeApp)
};

export type IpcConnectorType = typeof ipcConnector;

contextBridge.exposeInMainWorld(IPC_CONNECTOR_NAME, ipcConnector);
