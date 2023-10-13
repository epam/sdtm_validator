import path from 'path';

export const getPath = (...directories: string[]): string => path.join(...directories);
