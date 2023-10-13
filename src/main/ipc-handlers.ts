import { BrowserWindow, ipcMain } from 'electron';

import { IPC_MESSAGES } from './constants';
import {
  AppManager,
  DatasetsManager,
  DefineXmlManager,
  DictionariesManager,
  ReportsManager,
  RulesManager,
  ValidationManager
} from './core';

export const clearIpcHandlers = () => {
  Object.values(IPC_MESSAGES).forEach((message) => ipcMain.removeHandler(message));
};

export const initIpcHandlers = (window: BrowserWindow) => {
  ipcMain.handle(IPC_MESSAGES.chooseDatasets, DatasetsManager.chooseDatasets(window));
  ipcMain.handle(IPC_MESSAGES.getDatasetsMetadata, DatasetsManager.getDatasetsMetadata);
  ipcMain.handle(IPC_MESSAGES.validateDatasetPaths, DatasetsManager.validateDatasetPaths);
  ipcMain.handle(IPC_MESSAGES.runValidation, ValidationManager.runValidation);
  ipcMain.handle(IPC_MESSAGES.saveAndOpenReport, ReportsManager.saveAndOpenReport);
  ipcMain.handle(IPC_MESSAGES.getReportDetails, ReportsManager.getReportDetails);
  ipcMain.handle(IPC_MESSAGES.getCdiscRules, RulesManager.getCdiscRules);
  ipcMain.handle(IPC_MESSAGES.chooseDefineXml, DefineXmlManager.chooseDefineXml(window));
  ipcMain.handle(IPC_MESSAGES.validateDefineXml, DefineXmlManager.validateDefineXml);
  ipcMain.handle(IPC_MESSAGES.getAppInfo, AppManager.getAppInfo);
  ipcMain.handle(IPC_MESSAGES.openUserGuide, AppManager.openUserGuide);
  ipcMain.handle(IPC_MESSAGES.chooseDictionary, DictionariesManager.chooseDictionary(window));
  ipcMain.handle(IPC_MESSAGES.installDictionary, DictionariesManager.installDictionary);
  ipcMain.handle(IPC_MESSAGES.getDictionaries, DictionariesManager.getDictionaries);
  ipcMain.handle(IPC_MESSAGES.checkDictionaries, DictionariesManager.checkDictionariesIntegrity);
  ipcMain.handle(IPC_MESSAGES.closeApp, AppManager.closeApp);
};
