import { IPC_CONNECTOR_NAME } from '../../common';
import { IpcConnectorType } from '../preload';

export {};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    [IPC_CONNECTOR_NAME]: IpcConnectorType;
  }
}
