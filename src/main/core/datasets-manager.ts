import { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import log from 'electron-log';

import { DatasetType, VALID_DATASET_EXTENSIONS } from '../../common';
import { FileSystemManager } from './file-system-manager';

const logger = log.scope('DatasetsManager');

const validateDatasetPath = async (datasetPath: string): Promise<string> => {
  const isFile = await FileSystemManager.isFile(datasetPath);
  const extension = FileSystemManager.getFileExtension(datasetPath);
  const isValidExtension = VALID_DATASET_EXTENSIONS.includes(extension.toLowerCase());

  return isFile && isValidExtension ? datasetPath : '';
};

const validateDatasetPaths = async (_: IpcMainInvokeEvent, datasetPaths: string[]): Promise<string[]> => {
  try {
    logger.info('Validating datasets extension...');

    const validDatasets = (await Promise.all(datasetPaths.map(validateDatasetPath))).filter((datasetPath) => !!datasetPath);

    logger.info('Datasets validated');

    return validDatasets;
  } catch (e) {
    logger.error(e);

    throw e;
  }
};

const getDatasetMetadata = async (datasetPath: string): Promise<DatasetType> => {
  const domain = 'N/A';
  const name = FileSystemManager.getFileName(datasetPath);
  const size = await FileSystemManager.getFileSize(datasetPath);

  return { name, size, domain, path: datasetPath };
};

const getDatasetsMetadata = async (_: IpcMainInvokeEvent, datasetPaths: string[]): Promise<DatasetType[]> => {
  try {
    logger.info('Getting datasets metadata...');

    const datasetsMetadata = await Promise.all(datasetPaths.map(getDatasetMetadata));

    logger.info(`Metadata received`);

    return datasetsMetadata;
  } catch (e) {
    logger.error(e);

    throw e;
  }
};

const chooseDatasets =
  (window: BrowserWindow) =>
  async (_: IpcMainInvokeEvent): Promise<string[]> => {
    try {
      logger.info(`Choosing datasets...`);

      const datasetPaths = await FileSystemManager.chooseFiles(window, [{ extensions: VALID_DATASET_EXTENSIONS, name: '' }]);

      logger.info(datasetPaths.length ? `Chosen datasets ${datasetPaths.join(',')}` : 'Dialog closed');

      return datasetPaths;
    } catch (e) {
      logger.error(e);

      throw e;
    }
  };

export const DatasetsManager = {
  chooseDatasets,
  getDatasetsMetadata,
  validateDatasetPaths
};
