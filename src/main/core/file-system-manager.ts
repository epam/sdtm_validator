import { BrowserWindow, dialog, FileFilter, shell } from 'electron';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import { getPath } from '../utils';

const createDir = async (dirPath: string) => {
  await fsPromises.mkdir(dirPath, { recursive: true });
};

const readDir = async (dirPath: string) => {
  const results = await fsPromises.readdir(dirPath);

  return results || [];
};

const deleteDir = async (dirPath: string) => {
  await fsPromises.rm(dirPath, { recursive: true });
};

const cleanDir = async (dirPath: string) => {
  const files = await readDir(dirPath);

  await Promise.all(files.map((file) => fsPromises.unlink(getPath(dirPath, file))));
};

const copyFile = async (filePath: string, destPath: string) => {
  await fsPromises.copyFile(filePath, destPath);
};

const readFile = async (filePath: string, encoding: BufferEncoding = 'utf-8') => {
  const data = await fsPromises.readFile(filePath, encoding);

  return data || '';
};

const chooseFiles = async (window: BrowserWindow, filters: FileFilter[], defaultPath?: string) => {
  const { filePaths } = await dialog.showOpenDialog(window, {
    properties: ['openFile', 'multiSelections'],
    buttonLabel: 'Choose',
    defaultPath,
    filters
  });

  return filePaths;
};

const chooseFile = async (window: BrowserWindow, filters: FileFilter[], defaultPath?: string) => {
  const { filePaths } = await dialog.showOpenDialog(window, {
    properties: ['openFile'],
    buttonLabel: 'Choose',
    defaultPath,
    filters
  });

  return filePaths[0] || '';
};

const chooseDirectory = async (window: BrowserWindow, filters: FileFilter[], defaultPath?: string) => {
  const { filePaths } = await dialog.showOpenDialog(window, {
    properties: ['openDirectory'],
    buttonLabel: 'Choose',
    defaultPath,
    filters
  });

  return filePaths[0] || '';
};

const getFileName = (filePath: string) => path.basename(filePath);

const getFileSize = async (filePath: string) => {
  const { size } = await fsPromises.stat(filePath);

  return size;
};

const getFileExtension = (filePath: string) => path.extname(filePath).slice(1);

const isFile = async (filePath: string) => {
  const file = await fsPromises.stat(filePath);

  return file.isFile();
};

const isFileExist = (filePath: string) => fs.existsSync(filePath);

const openFile = async (filePath: string) => {
  const error = await shell.openPath(filePath);

  return error;
};

const showFileInDirectory = (filePath: string) => {
  shell.showItemInFolder(filePath);
};

const copyDirectory = async (dirPath: string, destPath: string, force: boolean = false) => {
  await fsPromises.cp(dirPath, destPath, { recursive: true, force, errorOnExist: true });
};

const getDirectoryFiles = async (dirPath: string) => {
  const files = await fsPromises.readdir(dirPath);

  return files;
};

export const FileSystemManager = {
  createDir,
  readDir,
  deleteDir,
  cleanDir,
  readFile,
  chooseFiles,
  copyFile,
  getFileName,
  getFileSize,
  getFileExtension,
  isFile,
  isFileExist,
  openFile,
  showFileInDirectory,
  chooseFile,
  chooseDirectory,
  copyDirectory,
  getDirectoryFiles
};
