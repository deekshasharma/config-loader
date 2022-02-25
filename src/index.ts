import { convertToJson } from './toJson';
import { findConfigFiles } from './configLoader';

export const getConfig = (searchPath = './') => {
  return findConfigFiles(searchPath).then((allFiles) => {
    const configFiles = [...allFiles.toml, ...allFiles.json, ...allFiles.yaml];
    const allPromises = configFiles.map(async (currentFilePath) => {
      return await convertToJson(currentFilePath);
    });
    return Promise.all([...allPromises]).then((values) => {
      return values.reduce((acc: any, value) => {
        return Object.assign({ ...acc }, value);
      }, {});
    });
  });
};

/**
 * Uncomment to see the example usage of the getConfig() function
 */
// eslint-disable-next-line no-console
// getConfig('./src').then((config) => console.log(JSON.stringify(config)));
