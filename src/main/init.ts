import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import log, { LevelOption } from 'electron-log';
import fsPromises from 'fs/promises';

import { APP_DATA_PATH, APP_PATH } from '.';
import { DICTIONARIES_DIRECTORY, HELP_DIRECTORY, LOGS_DIRECTORY, REPORTS_DIRECTORY, USER_GUIDE } from './constants';
import { FileSystemManager } from './core';
import { formatLogDate, getCdiscCorePath, getHelpFilePath, getPath } from './utils';

const isDev = process.env.NODE_ENV === 'development';

const logger = log.scope('Init');

const initLogger = () => {
  log.transports.console.level = (process.env.APP_LOG_LEVEL as LevelOption) || false;
  log.transports.console.format = formatLogDate;

  log.transports.file.level = (process.env.APP_LOG_LEVEL as LevelOption) || 'warn';
  log.transports.file.format = formatLogDate;
  log.transports.file.maxSize = 1024 * 1024 * 5;
  log.transports.file.resolvePath = () => getPath(APP_DATA_PATH, LOGS_DIRECTORY, 'main.log');
};

const setupExtensions = async () => {
  try {
    logger.info(`Installing extensions...`);

    const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
    const setup = Promise.all(extensions.map((name) => installExtension(name)));

    await setup;

    logger.info(`Extensions installed`);
  } catch (e) {
    logger.warn(e);
  }
};

const createDirectories = async () => {
  try {
    logger.info(`Creating directories...`);

    const directories = [REPORTS_DIRECTORY, HELP_DIRECTORY, DICTIONARIES_DIRECTORY].map((dirName) => getPath(APP_DATA_PATH, dirName));
    const setup = Promise.all(directories.map(FileSystemManager.createDir));

    await setup;

    logger.info(`Directories created`);
  } catch (e) {
    logger.warn(e);
  }
};

const gettingPermission = async () => {
  try {
    logger.info('Getting permissions...');

    await fsPromises.chmod(getCdiscCorePath(process.platform), 0o755);

    logger.info('Permissions issued');
  } catch (e) {
    logger.warn(e);
  }
};

const copyHelpFiles = async () => {
  try {
    logger.info(`Coping help files...`);

    const helpFiles = [USER_GUIDE];
    const setup = Promise.all(helpFiles.map((name) => FileSystemManager.copyFile(getPath(APP_PATH, name), getHelpFilePath(name))));

    await setup;

    logger.info(`Help files copied`);
  } catch (e) {
    logger.warn(e);
  }
};

export const init = async () => {
  initLogger();

  logger.info(`Initializing app...`);

  if (isDev) {
    await setupExtensions();
  }

  if (process.platform === 'darwin') {
    await gettingPermission();
  }

  await createDirectories();
  await copyHelpFiles();

  logger.info(`Initializing completed`);
};
