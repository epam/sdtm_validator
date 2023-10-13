import { APP_PATH } from '..';
import { CDISC_CORE, CORE_MAC, CORE_WIN, RESOURCES_DIRECTORY } from '../constants';
import { getPath } from './get-path';

export const getCdiscCorePath = (platform: NodeJS.Platform): string => {
  const mockPath = '';
  const darwinPath = getPath(APP_PATH, RESOURCES_DIRECTORY, CORE_MAC, CDISC_CORE);
  const winPath = getPath(APP_PATH, RESOURCES_DIRECTORY, CORE_WIN, `${CDISC_CORE}.exe`);

  const platformPathMapping = {
    darwin: darwinPath,
    win32: winPath,
    linux: mockPath,
    aix: mockPath,
    freebsd: mockPath,
    openbsd: mockPath,
    android: mockPath,
    cygwin: mockPath,
    sunos: mockPath,
    haiku: mockPath,
    netbsd: mockPath
  };

  return platformPathMapping[platform];
};
