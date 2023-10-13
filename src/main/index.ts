import { app, BrowserWindow, dialog } from 'electron';
import log from 'electron-log';
import path from 'path';

import { MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH } from './constants';
import { AppManager } from './core';
import { init } from './init';
import { clearIpcHandlers, initIpcHandlers } from './ipc-handlers';
import { getPath } from './utils';

const isDev = process.env.NODE_ENV === 'development';
const getTheLock = app.requestSingleInstanceLock();
const isMac = process.platform === 'darwin';
const logger = log.scope('MainProcess');

/** This prevents windows showing up, while installing on MS Windows */
if (require('electron-squirrel-startup')) app.quit();

/** This prevents second instance */
if (!getTheLock) app.quit();

export const APP_PATH = path.resolve(process.cwd(), app.getAppPath());
export const APP_DATA_PATH = path.resolve(process.cwd(), app.getPath('userData'));
export const DOWNLOADS_PATH = path.resolve(process.cwd(), app.getPath('downloads'));

const createMainWindow = () => {
  const { center, fullscreen, ...bounds } = AppManager.getWindowOptions();

  const mainWindow = new BrowserWindow({
    ...bounds,
    fullscreenable: true,
    minHeight: MIN_WINDOW_HEIGHT,
    minWidth: MIN_WINDOW_WIDTH,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      preload: getPath(APP_PATH, 'build', 'main', 'preload.js')
    }
  });

  mainWindow.hide();

  mainWindow.setBounds(bounds);
  mainWindow.setFullScreen(fullscreen);
  center && mainWindow.center();

  mainWindow.loadURL(
    isDev ? `http://localhost:${process.env.CLIENT_PORT}` : `file://${getPath(APP_PATH, 'build', 'renderer', 'index.html')}`
  );

  initIpcHandlers(mainWindow);

  AppManager.trackWindowOptions(mainWindow);
  AppManager.setAppMenu(isMac, isDev);

  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.on('close', () => {
    clearIpcHandlers();
  });
};

app.whenReady().then(async () => {
  await init();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });

  process.on('uncaughtException', () => {
    dialog.showErrorBox = (title, content) => {
      logger.info(`Uncaught exception`);
      logger.info(`${title}\n${content}`);
      logger.info(`Force quit application`);
    };

    dialog.showMessageBoxSync({
      type: 'error',
      message: `Unexpected error occurred\nApplication will be closed`,
      title: 'Unknown error'
    });

    app.quit();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
