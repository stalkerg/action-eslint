import path from 'node:path';

import { info } from '@actions/core';

import { FileNamesList } from './types';
import inputs from './inputs';
import getChangedFiles from './get-changed-files';
import { printItems } from './print';
import ignoreFiles from './ignore-files';

const getFiles = async (): Promise<FileNamesList> => {
  if (inputs.allFiles) {
    info('Linting all files.');
    return ['.'];
  }

  info('Linting changed files.');

  const changedFiles = await getChangedFiles();
  printItems('Files changed.', changedFiles);

  const files = await ignoreFiles(changedFiles);
  const relativeFiles = files.map((file) => path.relative(inputs.workingDirectory, file));
  printItems('Files for linting', relativeFiles);

  return relativeFiles;
};

export default getFiles;
