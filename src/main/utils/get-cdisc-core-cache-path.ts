import path from 'path';

import { APP_PATH } from '..';
import { CACHE_DIRECTORY, CORE_MAC, CORE_WIN, RESOURCES_DIRECTORY } from '../constants';
import { getPath } from './get-path';

export const getCdiscCoreCachePath = (platform: NodeJS.Platform): string => {
  const mockPath = '';
  const darwinPath = path.relative('', getPath(APP_PATH, RESOURCES_DIRECTORY, CORE_MAC, RESOURCES_DIRECTORY, CACHE_DIRECTORY));
  const winPath = path.relative('', getPath(APP_PATH, RESOURCES_DIRECTORY, CORE_WIN, RESOURCES_DIRECTORY, CACHE_DIRECTORY));

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
