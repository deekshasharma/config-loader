import ErrnoException = NodeJS.ErrnoException;
const toml = require('toml');
const fs = require('fs');
import yaml from 'js-yaml';
import { sep } from 'path';

export const convertToJson = async (
  path: string,
  fileName: string,
  fileExtension: string
) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err: ErrnoException | null, data: string) => {
      if (err) reject(`Error handling file, ${err}`);
      if (fileExtension === '.toml')
        resolve({ [fileName]: JSON.parse(JSON.stringify(toml.parse(data))) });
      else if (fileExtension === '.json')
        resolve({ [fileName]: JSON.parse(data) });
    });
  });
};

export const yaml2Json = (inputFilePath: string) => {
  const pathSplits = inputFilePath.split(sep);
  const fileName = pathSplits[pathSplits.length - 1].replace('.yaml', '');
  return {
    [fileName]: yaml.load(fs.readFileSync(inputFilePath, { encoding: 'utf-8' }))
  };
};
