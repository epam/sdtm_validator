import { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import log from 'electron-log';
import { XMLValidator } from 'fast-xml-parser';

import { ERROR_MESSAGES, MAX_DEFINE_XML_SIZE, VALID_DEFINE_XML_EXTENSIONS } from '../../common';
import { FileSystemManager } from './file-system-manager';

const logger = log.scope('DefineXmlManager');

const validateDefineXml = async (_: IpcMainInvokeEvent, defineXmlPath: string) => {
  try {
    logger.info('Validating define xml...');

    const errors = [];

    const isFile = await FileSystemManager.isFile(defineXmlPath);

    if (isFile) {
      const defineXmlData = await FileSystemManager.readFile(defineXmlPath);
      const isXml = XMLValidator.validate(defineXmlData);

      if (isXml !== true) {
        logger.info(`Parser error ${isXml.err.msg}`);

        errors.push(ERROR_MESSAGES.defineXmlInvalidFormatError);
      }
    } else {
      errors.push(ERROR_MESSAGES.defineXmlInvalidFormatError);
    }

    const size = await FileSystemManager.getFileSize(defineXmlPath);

    if (size > MAX_DEFINE_XML_SIZE) {
      errors.push(ERROR_MESSAGES.maxDefineXmlSizeError);
    }

    logger.info('Define xml file validated');
    logger.info(`Errors: ${errors.join(', ') || 'none'}`);

    return errors;
  } catch (e) {
    logger.error(`${e}`);

    throw e;
  }
};

const chooseDefineXml = (window: BrowserWindow) => async () => {
  try {
    logger.info('Choosing define xml...');

    const defineXmlPath = await FileSystemManager.chooseFile(window, [{ extensions: VALID_DEFINE_XML_EXTENSIONS, name: '' }]);

    logger.info(`${defineXmlPath ? `Chosen define xml ${defineXmlPath}` : 'Dialog closed'}`);

    return defineXmlPath;
  } catch (e) {
    logger.error(`${e}`);

    throw e;
  }
};

export const DefineXmlManager = {
  chooseDefineXml,
  validateDefineXml
};
