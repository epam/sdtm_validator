import { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import log from 'electron-log';

import {
  AddDictionaryType,
  DICTIONARY_LABELS,
  DICTIONARY_MAX_FILES,
  DICTIONARY_MAX_SIZE,
  DictionaryCommonType,
  DictionaryType,
  ERROR_MESSAGES,
  ERROR_STATUSES,
  getFormattedSize,
  SelectedDictionariesType
} from '../../common';
import { DICTIONARY_SCHEMAS } from '../constants';
import { getInstalledDictionaries, setInstalledDictionary } from '../store';
import { getDictionaryPath, getPath, getTotalDictionarySize, setError } from '../utils';
import { FileSystemManager } from './file-system-manager';
import { NotificationManager } from './notification-manager';

const logger = log.scope('DictionariesManager');

const dictionaryIntegrityCheck = async (dictionary: DictionaryCommonType, dictionaryPath: string) => {
  logger.info(`Checking integrity of dictionary...`);

  const { type, version } = dictionary;

  const dictionaryFiles = await FileSystemManager.getDirectoryFiles(dictionaryPath);

  const checkingFiles = Promise.all(
    DICTIONARY_SCHEMAS[type].map(async (fileName) => {
      const file = dictionaryFiles.find((dictionaryFile) => dictionaryFile.toLowerCase() === fileName) || '';
      const isFile = await FileSystemManager.isFile(getPath(dictionaryPath, file));

      if (!file || !isFile) {
        logger.error(`Dictionary is not complete`);

        throw Error(
          setError({
            status: ERROR_STATUSES.dictionaryIntegrityError,
            message: `${DICTIONARY_LABELS[type]} ${version} ${ERROR_MESSAGES.dictionaryIntegrityError}`
          })
        );
      }
    })
  );

  await checkingFiles.catch((e) => {
    throw e;
  });

  logger.info(`Dictionary is complete`);
};

const checkDictionariesIntegrity = async (_: IpcMainInvokeEvent, selectedDictionaries: SelectedDictionariesType) => {
  logger.info('Checking for the dictionaries integrity...');

  await Promise.all(
    Object.entries(selectedDictionaries).map(async ([type, version]) => {
      try {
        await DictionariesManager.dictionaryIntegrityCheck(
          { type: type as DictionaryType, version },
          getDictionaryPath(type as DictionaryType, version)
        );
      } catch {
        logger.error(`Dictionary ${type} ${version} was damaged`);

        throw Error(
          setError({
            status: ERROR_STATUSES.dictionaryCorruptedError,
            message: JSON.stringify({ type, version })
          })
        );
      }
    })
  );

  logger.info('All dictionaries are intact');
};

const validateDictionary = async ({ type, version }: AddDictionaryType, dictionaryPath: string) => {
  logger.info(`Validating dictionary...`);

  const isFile = await FileSystemManager.isFile(dictionaryPath);

  if (isFile) {
    logger.error(`Dictionary must be a directory`);

    throw Error(setError({ status: ERROR_STATUSES.dictionaryNotDirectoryError, message: ERROR_MESSAGES.dictionaryNotDirectoryError }));
  }

  const dictionaryFiles = await FileSystemManager.getDirectoryFiles(dictionaryPath);

  if (dictionaryFiles.length > DICTIONARY_MAX_FILES[type]) {
    logger.error(`Number of files is more than allowed`);

    throw Error(
      setError({
        status: ERROR_STATUSES.dictionaryMaxFilesError,
        message: `${ERROR_MESSAGES.dictionaryMaxFilesError} ${DICTIONARY_MAX_FILES[type]} items`
      })
    );
  }

  const dictionaryFilesSizes = await Promise.all(
    dictionaryFiles.map((file) => FileSystemManager.getFileSize(getPath(dictionaryPath, file)))
  );

  const dictionarySize = getTotalDictionarySize(dictionaryFilesSizes);

  if (dictionarySize > DICTIONARY_MAX_SIZE[type]) {
    logger.error(`Dictionary size is more than allowed`);

    throw Error(
      setError({
        status: ERROR_STATUSES.dictionaryMaxSizeError,
        message: `${ERROR_MESSAGES.dictionaryMaxSizeError} ${getFormattedSize(DICTIONARY_MAX_SIZE[type])}`
      })
    );
  }

  await dictionaryIntegrityCheck({ type, version }, dictionaryPath);

  logger.info(`Dictionary is valid`);
};

const copyDictionary = async ({ type, version }: AddDictionaryType, dictionaryPath: string) => {
  const destPath = getDictionaryPath(type, version);

  logger.info(`Path to save ${destPath}`);

  const isExist = FileSystemManager.isFileExist(destPath);

  if (isExist) {
    logger.info(`Clearing directory before proceed...`);

    await FileSystemManager.deleteDir(destPath);

    logger.info(`Directory is cleaned`);
  }

  logger.info(`Coping dictionary...`);

  await FileSystemManager.createDir(destPath);

  const dictionaryFiles = await FileSystemManager.getDirectoryFiles(dictionaryPath);

  const copingDictionary = Promise.all(
    dictionaryFiles
      .filter((fileName) => DICTIONARY_SCHEMAS[type].includes(fileName.toLowerCase()))
      .map((fileName) => FileSystemManager.copyFile(getPath(dictionaryPath, fileName), getPath(destPath, fileName.toLowerCase())))
  );

  await copingDictionary;

  logger.info(`Coping was successfully`);
};

const chooseDictionary =
  (window: BrowserWindow) =>
  async (_: IpcMainInvokeEvent): Promise<string> => {
    try {
      logger.info('Choosing dictionary...');

      const dictionaryPath = await FileSystemManager.chooseDirectory(window, []);

      logger.info(`${dictionaryPath.length ? `Chosen dictionary ${dictionaryPath}` : 'Dialog closed'}`);

      return dictionaryPath;
    } catch (e) {
      logger.error(`${e}`);

      throw e;
    }
  };

const installDictionary = async (_: IpcMainInvokeEvent, dictionary: AddDictionaryType, dictionaryPath: string): Promise<void> => {
  try {
    logger.info('Installing dictionary...');
    logger.info(`Dictionary ${JSON.stringify(dictionary)}`);
    logger.info(`Path to dictionary ${dictionaryPath}`);

    await validateDictionary(dictionary, dictionaryPath);
    await copyDictionary(dictionary, dictionaryPath);

    setInstalledDictionary(dictionary);

    logger.info('Dictionary was successfully installed');

    setTimeout(() => {
      NotificationManager.showNotification({ body: `Dictionary was successfully installed` });
    }, 400);
  } catch (e) {
    logger.error(`${e}`);

    throw e;
  }
};

const getDictionaries = (_: IpcMainInvokeEvent) => {
  const dictionaries = getInstalledDictionaries();

  return dictionaries;
};

export const DictionariesManager = {
  dictionaryIntegrityCheck,
  chooseDictionary,
  installDictionary,
  getDictionaries,
  checkDictionariesIntegrity
};
