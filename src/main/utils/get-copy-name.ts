import { FileSystemManager } from '../core';

export const getCopyName = (getCheckPath: (fileName: string) => string, fileName: string, count: number = 0): string => {
  const copyName = `${fileName}${count === 0 ? '' : ` (${count})`}`;
  const isExist = FileSystemManager.isFileExist(getCheckPath(copyName));

  if (isExist) {
    return getCopyName(getCheckPath, fileName, ++count);
  }

  return copyName;
};
