import { convertToJson } from './toJson';
import path from 'path';
import { findConfigFiles } from './configLoader';

export const getConfig = (searchPath = './') => {
  return findConfigFiles(searchPath).then((allFiles) => {
    const configFiles = [...allFiles.toml, ...allFiles.json, ...allFiles.yaml];

    const allPromises = configFiles.map(async (currentFile) => {
      const fileExtension = path.extname(currentFile);
      const fileName = path.basename(currentFile, fileExtension);
      return await convertToJson(currentFile, fileName, fileExtension);
    });

    return Promise.all([...allPromises]).then((values) => {
      return values.reduce((acc: any, value) => {
        return Object.assign({ ...acc }, value);
      }, {});
    });
  });
};

/**
 * Example usage of the getConfig function
 */
// eslint-disable-next-line no-console
getConfig('./src').then((config) => console.log(JSON.stringify(config)));
