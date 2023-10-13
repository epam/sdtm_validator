import dayjs from 'dayjs';
import { app, BrowserWindow, Menu, MenuItemConstructorOptions, screen } from 'electron';
import log from 'electron-log';

import { AppInfoType, ERROR_MESSAGES, ERROR_STATUSES } from '../../common';
import { APP_DATA_PATH, DOWNLOADS_PATH } from '..';
import {
  CDISC_CORE_VERSION,
  LOGS_DIRECTORY,
  MAX_WINDOW_HEIGHT,
  MAX_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  USER_GUIDE,
  WINDOW_RATIO
} from '../constants';
import { getSavedWindowOptions, INITIAL_WINDOW_OPTIONS, saveWindowOptions } from '../store';
import { WindowOptionsType } from '../types';
import { getCopyName, getHelpFilePath, getPath, setError } from '../utils';
import { FileSystemManager } from './file-system-manager';

const logger = log.scope('AppManager');

const getWindowOptions = (): WindowOptionsType => {
  try {
    logger.info('Getting window options...');

    const savedWindowOptions = getSavedWindowOptions();
    const { x, y, width, height, fullscreen } = savedWindowOptions;

    const inRange =
      (x || x === 0) &&
      (y || y === 0) &&
      width &&
      height &&
      screen
        .getAllDisplays()
        .reduce(
          (acc, { bounds }) =>
            acc || (x + width > bounds.x && y + height > bounds.y && x <= bounds.x + bounds.width && y <= bounds.y + bounds.height),
          false
        );

    if (inRange) {
      return savedWindowOptions;
    }

    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().bounds;

    const calcWidth = Math.trunc(screenWidth * WINDOW_RATIO);
    const calcHeight = Math.trunc(screenHeight * WINDOW_RATIO);

    const initWidth = calcWidth >= MIN_WINDOW_WIDTH ? (calcWidth <= MAX_WINDOW_WIDTH ? calcWidth : MAX_WINDOW_WIDTH) : MIN_WINDOW_WIDTH;
    const initHeight =
      calcHeight >= MIN_WINDOW_HEIGHT ? (calcHeight <= MAX_WINDOW_HEIGHT ? calcHeight : MAX_WINDOW_HEIGHT) : MIN_WINDOW_HEIGHT;

    const windowOptions = { width: initWidth, height: initHeight, fullscreen, center: true };

    saveWindowOptions(windowOptions);

    logger.info('Window options received');

    return windowOptions;
  } catch (e) {
    logger.warn(e);

    return INITIAL_WINDOW_OPTIONS;
  }
};

const trackWindowOptions = (window: BrowserWindow) => {
  try {
    logger.info('Set tracking window options...');

    ['leave-full-screen', 'moved', 'resized'].forEach((event: any) =>
      window.on(event, () => {
        saveWindowOptions({ ...window.getBounds(), fullscreen: window.fullScreen });
      })
    );

    window.on('enter-full-screen', () => {
      saveWindowOptions({ ...window.getBounds(), fullscreen: true });
    });

    logger.info('Window options will be tracked');
  } catch (e) {
    logger.warn(e);
  }
};

const getAppInfo = (): AppInfoType => {
  try {
    logger.info('Getting app info...');

    const name = app.getName() || 'N/A';
    const version = app.getVersion() || 'N/A';
    const cdiscVersion = CDISC_CORE_VERSION;

    logger.info('App info received');

    return { name, version, cdiscVersion };
  } catch (e) {
    logger.warn(e);

    throw e;
  }
};

const openUserGuide = async () => {
  try {
    logger.info('Opening user guide...');

    const error = await FileSystemManager.openFile(getHelpFilePath(USER_GUIDE));

    if (error) {
      logger.error(`${error} ${getHelpFilePath(USER_GUIDE)}`);

      throw Error(setError({ status: ERROR_STATUSES.userGuideError, message: ERROR_MESSAGES.userGuideError }));
    }

    logger.info('User guide opened');
  } catch (e) {
    logger.error(e);

    throw e;
  }
};

const closeApp = () => {
  try {
    logger.info('Closing app...');

    app.quit();

    logger.info('App closed');
  } catch (e) {
    logger.error(e);

    throw e;
  }
};

const exportLogs = async () => {
  try {
    logger.info('Exporting logs...');

    const getCheckPath = (directoryName: string) => getPath(DOWNLOADS_PATH, directoryName);

    const date = dayjs().format('YYYY-MM-DD');
    const exportDirectoryName = `${app.getName()}_logs_${date}`;
    const exportPath = getPath(DOWNLOADS_PATH, getCopyName(getCheckPath, exportDirectoryName));

    await FileSystemManager.copyDirectory(getPath(APP_DATA_PATH, LOGS_DIRECTORY), exportPath);
    FileSystemManager.showFileInDirectory(exportPath);

    logger.info('Logs were exported');
  } catch (e) {
    logger.error(e);

    throw e;
  }
};

const setAppMenu = (isMac: boolean, isDev: boolean) => {
  try {
    logger.info('Set up app menu...');

    const menuTemplate = [
      ...(isMac
        ? [
            {
              label: app.getName(),
              submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
              ]
            }
          ]
        : []),
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'delete' },
          { role: 'selectAll' }
        ]
      },
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'zoom' },
          { type: 'separator' },
          ...(isMac
            ? [{ role: 'togglefullscreen' }, { type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'close' }]
            : [{ role: 'close' }])
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Support Email'
          },
          {
            label: 'License'
          },
          {
            label: 'Authors / Acknowledgements'
          },
          {
            label: 'User Guide',
            click: openUserGuide
          },
          {
            label: 'Export Logs',
            click: exportLogs
          }
        ]
      },
      ...(isDev
        ? [
            {
              label: 'Dev',
              submenu: [{ role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' }, { type: 'separator' }]
            }
          ]
        : [])
    ] as MenuItemConstructorOptions[];

    const menu = Menu.buildFromTemplate(menuTemplate);

    Menu.setApplicationMenu(menu);

    logger.info('Menu set up');
  } catch (e) {
    logger.warn(e);
  }
};

export const AppManager = {
  trackWindowOptions,
  getWindowOptions,
  setAppMenu,
  getAppInfo,
  openUserGuide,
  closeApp
};
